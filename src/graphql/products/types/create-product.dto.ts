import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductDTO {
  @Field({ description: 'Name of the product' })
  name: string;

  @Field({ description: 'Description of the product' })
  description: string;
}
