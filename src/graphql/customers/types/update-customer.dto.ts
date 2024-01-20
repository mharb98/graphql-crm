import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Input for updating customers' })
export class UpdateCustomerDTO {
  @Field({
    description: 'First name of customer being created',
    nullable: true,
  })
  firstName?: string;

  @Field({
    description: 'Last name of customer being created',
    nullable: true,
  })
  lastName?: string;
}
