import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Input for creation of users' })
export class CreateUserDTO {
  @Field({ description: 'First name of the user', nullable: false })
  firstName: string;

  // @Field({ description: 'Middle name of the user', nullable: true })
  @Field(() => String, {
    description: 'Middle name of the user',
    nullable: true,
  })
  middleName: string;

  @Field(() => String, { description: 'Last name of user', nullable: false })
  lastName: string;

  @Field(() => String, { description: 'Email of user', nullable: false })
  email: string;

  @Field(() => String, { description: 'Phone number of user' })
  phoneNumber: string;
}
