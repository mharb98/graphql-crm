import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Input for the creation of a new comment' })
export class CreateCommentDTO {
  @Field(() => String!, { description: 'The comment that will be added' })
  comment: string;

  @Field({ description: 'The id of the user adding the comment' })
  userId: number;
}
