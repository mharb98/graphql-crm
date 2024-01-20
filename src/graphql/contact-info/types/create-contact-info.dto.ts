import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Input for creation of customers contact info' })
export class CreateContactInfoDTO {
  @Field({ description: 'Value for contact info being added', nullable: false })
  value: string;
}
