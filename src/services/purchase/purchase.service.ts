import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PurchaseRepository } from '../../data-access/repositories/purchase.repository';
import { PurchaseProductRepository } from '../../data-access/repositories/purchase-product.repository';
import { CreatePurchaseDTO } from '../../graphql/resolvers/purchase/types/create-purchase.dto';
import { PurchaseEntity } from '../../data-access/entities/purchase.entity';
import { ProductRepository } from '../../data-access/repositories/product.repository';
import { ProductEntity } from '../../data-access/entities/product.entity';
import { UpdatePurchaseDTO } from '../../graphql/resolvers/purchase/types/update-purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly purchaseRepository: PurchaseRepository,
    private readonly purchaseProductRepository: PurchaseProductRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async createPurchase(
    customerId: number,
    createPurchaseDto: CreatePurchaseDTO,
  ): Promise<PurchaseEntity> {
    const { purchaseProducts } = createPurchaseDto;
    let totalPrice = 0;
    let totalDiscount = 0;
    let currentProduct: ProductEntity;
    const salesAgentId = 29;

    const productIds: number[] = purchaseProducts.map(
      (purchaseProduct) => purchaseProduct.productId,
    );
    const products: ProductEntity[] = await this.productRepository.listAll({
      ids: productIds,
    });

    purchaseProducts.forEach((purchaseProduct) => {
      currentProduct = products.find(
        (product) => product.id === purchaseProduct.productId,
      );

      totalPrice += currentProduct.price * purchaseProduct.amount;
      totalDiscount += purchaseProduct.discount;
    });

    const taxes = (totalPrice - totalDiscount) * 0.24;

    const result = await this.purchaseRepository.createPurchase({
      customerId,
      totalDiscount: totalDiscount,
      totalPrice: totalPrice,
      taxes: taxes,
      salesAgentId,
    });

    const purchaseId = result.identifiers[0].id;

    try {
      const productsToAdd = purchaseProducts.map((purchaseProduct) => {
        return {
          productId: purchaseProduct.productId,
          amount: purchaseProduct.amount,
          discount: purchaseProduct.discount,
          purchaseId,
        };
      });

      await this.purchaseProductRepository.createPurchaseProduct(productsToAdd);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to add purchase products');
    }

    return await this.purchaseRepository.findOne(purchaseId);
  }

  async findOne(id: number): Promise<PurchaseEntity> {
    return await this.purchaseRepository.findOne(id);
  }

  async updatePurchase(
    id: number,
    updatePurchaseDto: UpdatePurchaseDTO,
  ): Promise<PurchaseEntity> {
    await this.purchaseRepository.updatePurchase(id, updatePurchaseDto);

    return await this.purchaseRepository.findOne(id);
  }
}
