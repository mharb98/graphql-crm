import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsRelations, In, InsertResult } from 'typeorm';
import { PurchaseProductEntity } from '../entities/purchase-product.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ListPurchaseProducts } from './query-input-types/list-purchase-products.type';

@Injectable()
export class PurchaseProductRepository {
  constructor(private readonly dataSource: DataSource) {}

  async createPurchaseProduct(
    createPurchaseProductDto:
      | QueryDeepPartialEntity<PurchaseProductEntity>
      | QueryDeepPartialEntity<PurchaseProductEntity>[],
  ): Promise<InsertResult> {
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

  async listAll(
    query: ListPurchaseProducts,
    relations: FindOptionsRelations<PurchaseProductEntity>,
  ): Promise<PurchaseProductEntity[]> {
    const { ids, purchaseIds, productIds } = query;

    return await this.dataSource.getRepository(PurchaseProductEntity).find({
      where: {
        id: ids ? In(ids) : undefined,
        purchaseId: purchaseIds ? In(purchaseIds) : undefined,
        productId: productIds ? In(productIds) : undefined,
      },
      relations,
    });
  }
}
