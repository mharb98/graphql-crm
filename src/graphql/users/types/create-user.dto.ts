import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Input for creation of users' })
export class CreateUserDTO {
  @Field({ description: 'First name of user', nullable: false })
  firstName: string;

  @Field({ description: 'Middle name of user' })
  middleName: string;

  @Field({ description: 'Last name of user', nullable: false })
  lastName: string;

  @Field({ description: 'Email of user', nullable: false })
  email: string;

  @Field({ description: 'Phone number of user' })
  phoneNumber: string;
}
