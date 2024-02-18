import { Field, InputType, Int } from '@nestjs/graphql';

@InputType({ description: 'Input for the creation of a status update' })
export class CreateStatusUpdateDTO {
  @Field(() => String, {
    description: 'Comment attached with the status update',
  })
  comment: string;

  @Field(() => Int, {
    description: 'ID of the status to which the customer will be updated',
  })
  statusId: number;

  @Field(() => Int, {
    description: 'ID of the customer for which the status update is being made',
  })
  customerId: number;
}
