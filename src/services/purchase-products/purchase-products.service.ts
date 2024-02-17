import { BadRequestException, Injectable } from '@nestjs/common';
import { PurchaseProductRepository } from '../../data-access/repositories/purchase-product.repository';
import { UpdatePurchaseProductDTO } from '../../graphql/resolvers/purchase-product/types/update-purchase-product.dto';
import { PurchaseProductEntity } from '../../data-access/entities/purchase-product.entity';
import { PurchaseRepository } from '../../data-access/repositories/purchase.repository';
import { ProductRepository } from '../../data-access/repositories/product.repository';
import { CreatePurchaseProductDTO } from '../../graphql/resolvers/purchase-product/types/create-purchase-product.dto';
import { UpdatePurchaseDTO } from '../../graphql/resolvers/purchase/types/update-purchase.dto';
import { UpdateProductDTO } from '../../graphql/resolvers/products/types/update-product.dto';

@Injectable()
export class PurchaseProductsService {
  constructor(
    private readonly purchaseProductRepository: PurchaseProductRepository,
    private readonly purchaseRepository: PurchaseRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async createPurchaseProduct(
    createPurchaseProductDto: CreatePurchaseProductDTO,
  ): Promise<PurchaseProductEntity> {
    const { productId, purchaseId, amount, discount } =
      createPurchaseProductDto;

    const product = await this.productRepository.findOne(productId);

    if (product.stock < createPurchaseProductDto.amount) {
      throw new BadRequestException(
        'Amount entered is more that what is available in stock',
      );
    }

    const purchase = await this.purchaseRepository.findOne(purchaseId);

    const totalPrice = purchase.totalPrice + product.price * amount;
    const totalDiscount = purchase.totalDiscount + discount;
    const taxes = totalPrice * 0.24;
    const stock = product.stock - amount;

    const result = await this.purchaseProductRepository.createPurchaseProduct(
      createPurchaseProductDto,
    );

    await this.purchaseRepository.updatePurchase(purchaseId, {
      totalPrice,
      totalDiscount,
      taxes,
    });

    await this.productRepository.updateProduct(productId, { stock });

    return await this.purchaseProductRepository.findOne(
      result.identifiers[0].id,
    );
  }

  async updatePurchaseProduct(
    id: number,
    updatePurchaseProductDto: UpdatePurchaseProductDTO,
  ): Promise<PurchaseProductEntity> {
    const { amount, discount } = updatePurchaseProductDto;

    let totalPrice = 0,
      totalDiscount = 0,
      stock = 0;

    const purchaseProduct = await this.purchaseProductRepository.findOne(id);

    const product = await this.productRepository.findOne(
      purchaseProduct.productId,
    );

    const purchase = await this.purchaseRepository.findOne(
      purchaseProduct.purchaseId,
    );

    if (amount) {
      const newAmount = amount - purchaseProduct.amount;

      if (newAmount > product.stock) {
        throw new BadRequestException(
          'Amount entered is more that what is available in stock',
        );
      }

      stock = product.stock - newAmount;
      const oldPrice = purchaseProduct.amount * product.price;
      const newPrice = amount * product.price;
      totalPrice = purchase.totalPrice - oldPrice + newPrice;
    }

    if (discount) {
      totalDiscount =
        purchase.totalDiscount - purchaseProduct.discount + discount;
    }

    const taxes = (totalPrice - totalDiscount) * 0.24;

    await this.purchaseRepository.updatePurchase(purchaseProduct.purchaseId, {
      totalPrice,
      totalDiscount,
      taxes,
    });

    await this.productRepository.updateProduct(purchaseProduct.productId, {
      stock,
    });

    await this.purchaseProductRepository.updatePurchaseProduct(
      id,
      updatePurchaseProductDto,
    );

    return await this.purchaseProductRepository.findOne(id);
  }

  async findOne(id: number): Promise<PurchaseProductEntity> {
    return await this.purchaseProductRepository.findOne(id);
  }

  async getPurchaseProducts(purchaseIds: number[]): Promise<any> {
    const purchaseProducts = await this.purchaseProductRepository.listAll(
      {
        purchaseIds,
      },
      {},
    );

    return purchaseIds.map((purchaseId) => {
      const products = purchaseProducts.filter(
        (product) => product.purchaseId === purchaseId,
      );
      return products;
    });
  }
}
