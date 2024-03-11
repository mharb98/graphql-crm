import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../data-access/repositories/product.repository';
import { ProductEntity } from '../../data-access/entities/product.entity';
import { CreateProductDTO } from '../../graphql/resolvers/products/types/create-product.dto';
import { UpdateProductDTO } from '../../graphql/resolvers/products/types/update-product.dto';
import { PurchaseProductRepository } from '../../data-access/repositories/purchase-product.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly purchaseProductRepository: PurchaseProductRepository,
  ) {}

  async createProduct(
    createProductDto: CreateProductDTO,
  ): Promise<ProductEntity> {
    const result = await this.productRepository.createProduct(createProductDto);

    return await this.productRepository.findOne(result.identifiers[0].id);
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDTO,
  ): Promise<ProductEntity> {
    await this.productRepository.updateProduct(id, updateProductDto);

    return await this.productRepository.findOne(id);
  }

  async findOne(id: number): Promise<ProductEntity> {
    return await this.productRepository.findOne(id);
  }

  async deleteProduct(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOne(id);

    await this.productRepository.deleteProduct(id);

    return product;
  }

  async getProductByPurchase(purchaseProductIds: number[]): Promise<any> {
    const purchaseProducts = await this.purchaseProductRepository.listAll(
      {
        ids: purchaseProductIds,
      },
      { product: true },
    );

    return purchaseProductIds.map((purchaseProductId) => {
      const product =
        purchaseProducts.find(
          (purchaseProduct) => purchaseProduct.id === purchaseProductId,
        ).product || null;

      return product;
    });
  }
}
