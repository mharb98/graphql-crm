import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field((type) => Int, { description: 'auto increment ID for the user model' })
  id: number;

  @Field({ nullable: false, description: 'First name of the user' })
  firstName: string;

  @Field({ description: 'Middle name of the user' })
  middleName: string;

  @Field({ nullable: false, description: 'Last name of the user' })
  lastName: string;

  @Field({ nullable: false, description: 'Email of the user' })
  email: string;

  @Field({ description: 'Phone number of the user' })
  phoneNumber: string;

  @Field({ description: 'Status of user (Enabled / Disabled)' })
  banned: boolean;

  @Field({ description: 'Creation date of the user' })
  createdAt: Date;

  @Field({ description: 'Last mutation date of the user' })
  updatedAt: Date;
}
