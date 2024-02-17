import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsRelations, In, InsertResult } from 'typeorm';
import { InstallmentEntity } from '../entities/installment.entity';
import { CreateInstallmentDTO } from '../../graphql/resolvers/installments/types/create-installment.dto';
import { UpdateInstallmentDTO } from '../../graphql/resolvers/installments/types/update-installment.dto';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ListAllInstallments } from './query-input-types/list-all-installments.type';

@Injectable()
export class InstallmentsRepository {
  constructor(private readonly dataSource: DataSource) {}

  async createInstallment(
    createInstallmentDto: QueryDeepPartialEntity<InstallmentEntity>,
  ): Promise<InsertResult> {
    return await this.dataSource
      .getRepository(InstallmentEntity)
      .insert(createInstallmentDto);
  }

  async updateInstallment(
    id: number,
    updateInstallmentDto: QueryDeepPartialEntity<InstallmentEntity>,
  ): Promise<void> {
    await this.dataSource
      .getRepository(InstallmentEntity)
      .update({ id }, updateInstallmentDto);
  }

  async findOne(id: number): Promise<InstallmentEntity> {
    return await this.dataSource
      .getRepository(InstallmentEntity)
      .findOneByOrFail({ id });
  }

  async deleteInstallment(id: number) {
    await this.dataSource.getRepository(InstallmentEntity).delete(id);
  }

  async listAll(
    query: ListAllInstallments,
    relations: FindOptionsRelations<InstallmentEntity>,
  ): Promise<InstallmentEntity[]> {
    const { purchaseId, purchaseIds } = query;
    return await this.dataSource.getRepository(InstallmentEntity).find({
      where: {
        purchaseId: purchaseId
          ? purchaseId
          : purchaseIds
          ? In(purchaseIds)
          : undefined,
      },
      relations,
    });
  }
}
