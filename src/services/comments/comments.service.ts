import { Injectable } from '@nestjs/common';
import { CommentsRepository } from '../../data-access/repositories/comment.repository';
import { CommentEntity } from '../../data-access/entities/comments.entity';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  public async getCustomersComments(customerIds: number[]): Promise<any> {
    const comments: CommentEntity[] = await this.commentsRepository.listAll(
      customerIds,
    );

    return customerIds.map((id) => {
      return comments.filter((comment) => comment.customerId === id) || null;
    });
  }
}
