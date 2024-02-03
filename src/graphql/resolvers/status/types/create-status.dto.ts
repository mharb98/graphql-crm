import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Input for the creation of a new status' })
export class CreateStatusDTO {
  @Field(() => String, {
    description: 'Name of the status to be created',
    nullable: false,
  })
  name: string;
}
