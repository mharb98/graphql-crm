import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Input for updating customer contact info' })
export class UpdateContactInfoDTO {
  @Field({ description: 'Value of contact info', nullable: false })
  value: string;
}
