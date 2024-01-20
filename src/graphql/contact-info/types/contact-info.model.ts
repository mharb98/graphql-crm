import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Customer } from '../../customers/types/customer.model';

@ObjectType()
export class ContactInfo {
  @Field((type) => Int, {
    nullable: false,
    description: 'ID of the specified contact info',
  })
  id: number;

  @Field()
  type: string;

  @Field()
  value: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field((type) => Customer)
  customer: Customer;
}
