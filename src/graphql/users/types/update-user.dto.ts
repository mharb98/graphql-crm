import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Input for updating an existing user record' })
export class UpdateUserDTO {
  @Field({
    description: 'First Name',
    nullable: true,
  })
  firstName?: string;

  @Field({ description: 'Middle Name', nullable: true })
  middleName?: string;

  @Field({ description: 'Last name of user being updated', nullable: true })
  lastName?: string;

  @Field({ description: 'Email', nullable: true })
  email?: string;

  @Field({ description: 'Phone Number', nullable: true })
  phoneNumber?: string;
}
