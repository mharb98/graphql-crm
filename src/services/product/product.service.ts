import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../data-access/repositories/product.repository';
import { ProductEntity } from '../../data-access/entities/product.entity';
import { CreateProductDTO } from '../../graphql/resolvers/products/types/create-product.dto';
import { UpdateProductDTO } from '../../graphql/resolvers/products/types/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

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

  async delete(id: number): Promise<void> {
    await this.productRepository.deleteProduct(id);
  }
}
