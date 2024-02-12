import { Injectable } from '@nestjs/common';
import { DataSource, InsertResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { StatusEntity } from '../entities/status.entity';

@Injectable()
export class StatusRepository {
  constructor(private readonly dataSource: DataSource) {}

  async createStatus(
    createStatusDto: QueryDeepPartialEntity<StatusEntity>,
  ): Promise<InsertResult> {
    return await this.dataSource
      .getRepository(StatusEntity)
      .insert(createStatusDto);
  }

  async updateStatus(
    id: number,
    updateStatusDto: QueryDeepPartialEntity<StatusEntity>,
  ): Promise<void> {
    await this.dataSource
      .getRepository(StatusEntity)
      .update({ id }, updateStatusDto);
  }

  async findOne(id: number): Promise<StatusEntity> {
    return await this.dataSource
      .getRepository(StatusEntity)
      .findOneByOrFail({ id });
  }

  async deleteStatus(id: number): Promise<void> {
    await this.dataSource.getRepository(StatusEntity).delete(id);
  }
}
