import { Injectable, NotFoundException } from '@nestjs/common';
import {
  DataSource,
  FindOptionsRelations,
  FindOptionsWhere,
  In,
  InsertResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { PurchaseEntity } from '../entities/purchase.entity';
import { ListAllPurchases } from './query-input-types/list-all-purchases.type';

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

  async findOne(
    id: number,
    relations?: FindOptionsRelations<PurchaseEntity>,
  ): Promise<PurchaseEntity> {
    const result = await this.dataSource
      .getRepository(PurchaseEntity)
      .findOne({ where: { id }, relations });

    if (!result) {
      throw new NotFoundException('Purchase does not exist');
    }

    return result;
  }

  async deletePurchase(id: number): Promise<void> {
    await this.dataSource.getRepository(PurchaseEntity).delete(id);
  }

  async listAll(
    query: ListAllPurchases,
    relations?: FindOptionsRelations<PurchaseEntity>,
  ) {
    return await this.dataSource.getRepository(PurchaseEntity).find({
      where: {
        id: query.ids ? In(query.ids) : undefined,
      },
      relations,
    });
  }
}
