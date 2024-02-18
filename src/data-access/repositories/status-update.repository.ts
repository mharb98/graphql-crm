import { Injectable } from '@nestjs/common';
import { DataSource, InsertResult } from 'typeorm';
import { StatusUpdateEntity } from '../entities/status-update.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class StatusUpdateRepository {
  constructor(private readonly dataSource: DataSource) {}

  async createStatusUpdate(
    createStatusUpdateDto: QueryDeepPartialEntity<StatusUpdateEntity>,
  ): Promise<InsertResult> {
    return await this.dataSource
      .getRepository(StatusUpdateEntity)
      .insert(createStatusUpdateDto);
  }

  async findOne(id: number): Promise<StatusUpdateEntity> {
    return await this.dataSource
      .getRepository(StatusUpdateEntity)
      .findOneByOrFail({ id });
  }

  async deleteStatusUpdate(id: number): Promise<void> {
    await this.dataSource.getRepository(StatusUpdateEntity).delete(id);
  }
}
