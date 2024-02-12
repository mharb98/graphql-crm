import { Injectable } from '@nestjs/common';
import { DataSource, InsertResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { PurchaseEntity } from '../entities/purchase.entity';

@Injectable()
export class PurchaseRepository {
  constructor(private readonly dataSource: DataSource) {}

  async createPurchase(
    createPurchaseDto: QueryDeepPartialEntity<PurchaseEntity>,
  ): Promise<InsertResult> {
    return await this.dataSource
      .getRepository(PurchaseEntity)
      .insert(createPurchaseDto);
  }

  async updatePurchase(
    id: number,
    updatePurchaseDto: QueryDeepPartialEntity<PurchaseEntity>,
  ): Promise<void> {
    await this.dataSource
      .getRepository(PurchaseEntity)
      .update({ id }, updatePurchaseDto);
  }

  async findOne(id: number): Promise<PurchaseEntity> {
    return await this.dataSource
      .getRepository(PurchaseEntity)
      .findOneByOrFail({ id });
  }

  async deletePurchase(id: number): Promise<void> {
    await this.dataSource.getRepository(PurchaseEntity).delete(id);
  }
}
