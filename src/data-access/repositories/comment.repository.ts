import { Injectable } from '@nestjs/common';
import { DataSource, In, InsertResult } from 'typeorm';
import { CommentEntity } from '../entities/comments.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class CommentsRepository {
  constructor(private readonly dataSource: DataSource) {}

  async findOne(id: number): Promise<CommentEntity> {
    return await this.dataSource
      .getRepository(CommentEntity)
      .findOneByOrFail({ id });
  }

  async create(
    createCommentDto: QueryDeepPartialEntity<CommentEntity>,
  ): Promise<InsertResult> {
    return await this.dataSource
      .getRepository(CommentEntity)
      .insert(createCommentDto);
  }

  async listAll(customerIds: number[]): Promise<CommentEntity[]> {
    return await this.dataSource.getRepository(CommentEntity).find({
      where: {
        customerId: In(customerIds),
      },
    });
  }
}
