import { Injectable } from '@nestjs/common';
import { DataSource, InsertResult } from 'typeorm';
import { PurchaseProductEntity } from '../entities/purchase-product.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class PurchaseProductRepository {
  constructor(private readonly dataSource: DataSource) {}

  async createPurchaseProduct(
    createPurchaseProductDto:
      | QueryDeepPartialEntity<PurchaseProductEntity>
      | QueryDeepPartialEntity<PurchaseProductEntity>[],
  ): Promise<InsertResult> {
    console.log(createPurchaseProductDto);
    return await this.dataSource
      .getRepository(PurchaseProductEntity)
      .insert(createPurchaseProductDto);
  }

  async updatePurchaseProduct(
    id: number,
    updatePurchaseDto: QueryDeepPartialEntity<PurchaseProductEntity>,
  ): Promise<void> {
    await this.dataSource
      .getRepository(PurchaseProductEntity)
      .update({ id }, updatePurchaseDto);
  }

  async deletePurchaseProduct(id: number): Promise<void> {
    await this.dataSource.getRepository(PurchaseProductEntity).delete(id);
  }

  async findOne(id: number): Promise<PurchaseProductEntity> {
    return await this.dataSource
      .getRepository(PurchaseProductEntity)
      .findOneByOrFail({ id });
  }
}
