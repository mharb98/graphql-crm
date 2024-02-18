import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsRelations, In, InsertResult } from 'typeorm';
import { CommentEntity } from '../entities/comments.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ListAllComments } from './query-input-types/list-all-comments.type';

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

  async listAll(
    query: ListAllComments,
    relations: FindOptionsRelations<CommentEntity>,
  ): Promise<CommentEntity[]> {
    const { userIds, customerIds } = query;

    return await this.dataSource.getRepository(CommentEntity).find({
      where: {
        customerId: customerIds ? In(customerIds) : undefined,
        userId: userIds ? In(userIds) : undefined,
      },
      relations,
    });
  }
}
