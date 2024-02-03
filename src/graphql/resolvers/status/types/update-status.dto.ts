import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Input for the update of an existing status' })
export class UpdateStatusDTO {
  @Field(() => String, {
    description: 'Name of the status to be updated',
    nullable: true,
  })
  name?: string;
}
