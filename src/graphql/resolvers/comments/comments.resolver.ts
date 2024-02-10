import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CommentEntity } from '../../../data-access/entities/comments.entity';
import { CreateCommentDTO } from './types/create-comment.dto';
import { BaseResolver } from '../base.resolver';
import { CommentsService } from '../../../services/comments/comments.service';

@Resolver(() => CommentEntity)
export class CommentsResolver extends BaseResolver(CommentEntity) {
  constructor(private readonly commentsService: CommentsService) {
    super();
  }

  @Query(() => CommentEntity, {
    name: 'comment',
    description: 'Find a specific comment by id',
  })
  async getComment(
    @Args('id', {
      type: () => Int,
      description: 'The ID of the comment to be returned',
    })
    id: number,
  ) {
    return await this.commentsService.findOne(id);
  }

  @Mutation(() => CommentEntity, {
    description: 'Create a new comment for a specific customer',
  })
  async createComment(
    @Args('customerId', {
      type: () => Int,
      description: 'The ID of the customer to which the comment will be added',
    })
    customerId: number,
    @Args('createCommentDto') createCommentDto: CreateCommentDTO,
  ) {
    return await this.commentsService.createComment(
      customerId,
      createCommentDto,
    );
  }

  @Mutation(() => CommentEntity, {
    description: 'Delete an existing comment by ID',
  })
  async deleteComment(
    @Args('id', {
      type: () => Int,
      description: 'The ID of the customer to which the comment will be added',
    })
    id: number,
  ) {
    console.log(id);
    return {
      id: 1,
      comment: 'Comment 1',
    };
  }

  @ResolveField()
  async user() {
    return {
      id: 1,
      firstName: 'Marwan',
      middleName: 'Salah',
      lastName: 'Harb',
      email: 'marwanharb65@outlook.com',
      phoneNumber: '+201013747167',
      banned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @ResolveField()
  async customer() {
    return {
      id: 1,
      firstName: 'Marwan',
      lastName: 'Salah',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
