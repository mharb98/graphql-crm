import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/types/user.model';
import { ContactInfo } from '../../contact-info/types/contact-info.model';

@ObjectType()
export class Customer {
  @Field((type) => Int, {
    nullable: false,
    description: 'ID for the specified user',
  })
  id: number;

  @Field({ description: 'Name of the customer' })
  firstName: string;

  @Field({ description: 'Last name of the customer' })
  lastName: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field((type) => User, {
    description: 'Sales representative assigned to user',
  })
  salesAgent: User;

  @Field((type) => [ContactInfo], {
    description: 'Contact Info for customer',
  })
  contactInfo: ContactInfo[];
}
