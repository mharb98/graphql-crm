import { Injectable } from '@nestjs/common';
import { DataSource, FindManyOptions, In, InsertResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ProductEntity } from '../entities/product.entity';

@Injectable()
export class ProductRepository {
  constructor(private readonly dataSource: DataSource) {}

  async findOne(id: number): Promise<ProductEntity> {
    return await this.dataSource
      .getRepository(ProductEntity)
      .findOneByOrFail({ id });
  }

  async createProduct(
    createProductDto: QueryDeepPartialEntity<ProductEntity>,
  ): Promise<InsertResult> {
    return await this.dataSource
      .getRepository(ProductEntity)
      .insert(createProductDto);
  }

  async updateProduct(
    id: number,
    updateProductDto: QueryDeepPartialEntity<ProductEntity>,
  ): Promise<void> {
    await this.dataSource
      .getRepository(ProductEntity)
      .update({ id }, updateProductDto);
  }

  async deleteProduct(id: number): Promise<void> {
    await this.dataSource.getRepository(ProductEntity).delete(id);
  }

  async listAll({ ids }: { ids: number[] }): Promise<ProductEntity[]> {
    return await this.dataSource
      .getRepository(ProductEntity)
      .find({ where: { id: In(ids) } });
  }
}
