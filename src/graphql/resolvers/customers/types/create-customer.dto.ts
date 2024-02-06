import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Input for creation of customers' })
export class CreateCustomerDTO {
  @Field({
    description: 'First name of customer being created',
    nullable: false,
  })
  firstName: string;

  @Field({
    description: 'Last name of customer being created',
    nullable: false,
  })
  lastName: string;

  @Field(() => [String], {
    description: 'Contact information for customer',
    nullable: false,
  })
  contactInfo: string[];
}
