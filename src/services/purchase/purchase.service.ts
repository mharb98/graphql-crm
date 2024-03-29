import { BadRequestException, Injectable } from '@nestjs/common';
import { PurchaseRepository } from '../../data-access/repositories/purchase.repository';
import { PurchaseProductRepository } from '../../data-access/repositories/purchase-product.repository';
import { CreatePurchaseDTO } from '../../graphql/resolvers/purchase/types/create-purchase.dto';
import { PurchaseEntity } from '../../data-access/entities/purchase.entity';
import { ProductRepository } from '../../data-access/repositories/product.repository';
import { ProductEntity } from '../../data-access/entities/product.entity';
import { CustomersRepository } from '../../data-access/repositories/customer.repository';
import { InstallmentsRepository } from '../../data-access/repositories/installments.repository';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly customerRepository: CustomersRepository,
    private readonly purchaseRepository: PurchaseRepository,
    private readonly purchaseProductRepository: PurchaseProductRepository,
    private readonly productRepository: ProductRepository,
    private readonly installmentsRepository: InstallmentsRepository,
  ) {}

  async createPurchase(
    customerId: number,
    createPurchaseDto: CreatePurchaseDTO,
  ): Promise<PurchaseEntity> {
    const { purchaseProducts } = createPurchaseDto;
    let totalPrice = 0;
    let totalDiscount = 0;
    let currentProduct: ProductEntity;

    const productIds: number[] = purchaseProducts.map(
      (purchaseProduct) => purchaseProduct.productId,
    );

    const products: ProductEntity[] = await this.productRepository.listAll({
      ids: productIds,
    });

    const customer = await this.customerRepository.findOne(customerId);

    for (const purchaseProduct of purchaseProducts) {
      currentProduct = products.find(
        (product) => product.id === purchaseProduct.productId,
      );

      if (currentProduct.stock < purchaseProduct.amount) {
        throw new BadRequestException(
          `The selected amount of this product ${currentProduct.name} exceeds what is available in stock`,
        );
      }

      totalPrice += currentProduct.price * purchaseProduct.amount;
      totalDiscount += purchaseProduct.discount;
    }

    const taxes = (totalPrice - totalDiscount) * 0.24;

    const result = await this.purchaseRepository.createPurchase({
      customerId,
      totalDiscount: totalDiscount,
      totalPrice: totalPrice,
      taxes: taxes,
      salesAgentId: customer.salesAgentId,
    });

    const purchaseId = result.identifiers[0].id;

    const productsToAdd = purchaseProducts.map((purchaseProduct) => {
      return {
        productId: purchaseProduct.productId,
        amount: purchaseProduct.amount,
        discount: purchaseProduct.discount,
        purchaseId,
      };
    });

    await this.purchaseProductRepository.createPurchaseProduct(productsToAdd);

    for (const purchaseProduct of purchaseProducts) {
      currentProduct = products.find(
        (product) => product.id === purchaseProduct.productId,
      );

      await this.productRepository.updateProduct(purchaseProduct.productId, {
        stock: currentProduct.stock - purchaseProduct.amount,
      });
    }

    return await this.purchaseRepository.findOne(purchaseId);
  }

  async findOne(id: number): Promise<PurchaseEntity> {
    return await this.purchaseRepository.findOne(id);
  }

  async deletePurchase(id: number): Promise<PurchaseEntity> {
    const purchase = await this.purchaseRepository.findOne(id);

    await this.purchaseRepository.deletePurchase(id);

    return purchase;
  }

  async getPurchaseByProduct(purchaseProductIds: number[]): Promise<any> {
    const purchaseProducts = await this.purchaseProductRepository.listAll(
      {
        ids: purchaseProductIds,
      },
      { purchase: true },
    );

    return purchaseProductIds.map((purchaseProductId) => {
      const purchase =
        purchaseProducts.find(
          (purchaseProduct) => purchaseProduct.id === purchaseProductId,
        ).purchase || null;

      return purchase;
    });
  }

  async getInstallmentPurchases(installmentIds: number[]): Promise<any> {
    const installments = await this.installmentsRepository.listAll(
      {
        ids: installmentIds,
      },
      { purchase: true },
    );

    return installmentIds.map((id) => {
      return (
        installments.find((installment) => installment.id === id).purchase ||
        null
      );
    });
  }

  async getCustomerPurchases(customerIds: number[]): Promise<any> {
    const customers = await this.customerRepository.listAll(
      { ids: customerIds },
      { purchases: true },
    );
    return customerIds.map((customerId) => {
      return (
        customers.find((customer) => customer.id === customerId).purchases || []
      );
    });
  }
}
