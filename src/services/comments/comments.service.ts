import { Injectable } from '@nestjs/common';
import { CommentsRepository } from '../../data-access/repositories/comment.repository';
import { CommentEntity } from '../../data-access/entities/comments.entity';
import { CreateCommentDTO } from '../../graphql/resolvers/comments/types/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  public async findOne(commentId: number): Promise<CommentEntity> {
    return this.commentsRepository.findOne(commentId);
  }

  public async createComment(
    customerId: number,
    createCommentDto: CreateCommentDTO,
  ): Promise<CommentEntity> {
    const result = await this.commentsRepository.create({
      customerId,
      ...createCommentDto,
    });

    return await this.commentsRepository.findOne(result.identifiers[0].id);
  }

  public async getCustomersComments(customerIds: number[]): Promise<any> {
    const comments: CommentEntity[] = await this.commentsRepository.listAll(
      {
        customerIds,
      },
      {},
    );

    return customerIds.map((id) => {
      return comments.filter((comment) => comment.customerId === id) || null;
    });
  }
}
