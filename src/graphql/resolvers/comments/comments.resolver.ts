import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CommentEntity } from '../../../data-access/entities/comments.entity';
import { CreateCommentDTO } from './types/create-comment.dto';
import { BaseResolver } from '../base.resolver';
import { CommentsService } from '../../../services/comments/comments.service';
import { CommentDataLoader } from '../../../dataloader/comment-data-loader/types/comment.data-loader';

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
    return await this.commentsService.deleteComment(id);
  }

  @ResolveField()
  async user(
    @Parent() comment: CommentEntity,
    @Context()
    { commentDataLoaders }: { commentDataLoaders: CommentDataLoader },
  ) {
    const { id } = comment;
    const { userDataLoader } = commentDataLoaders;

    return await userDataLoader.load(id);
  }

  @ResolveField()
  async customer(
    @Parent() comment: CommentEntity,
    @Context()
    { commentDataLoaders }: { commentDataLoaders: CommentDataLoader },
  ) {
    const { id } = comment;
    const { customerDataLoader } = commentDataLoaders;

    return await customerDataLoader.load(id);
  }
}
