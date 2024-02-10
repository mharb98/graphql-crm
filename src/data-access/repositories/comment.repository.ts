import { Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { CommentEntity } from '../entities/comments.entity';

@Injectable()
export class CommentsRepository {
  constructor(private readonly dataSource: DataSource) {}

  async listAll(customerIds: number[]): Promise<CommentEntity[]> {
    return await this.dataSource.getRepository(CommentEntity).find({
      where: {
        customerId: In(customerIds),
      },
    });
  }
}
