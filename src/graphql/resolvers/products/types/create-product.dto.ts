import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductDTO {
  @Field(() => String, { description: 'Name of the product', nullable: false })
  name: string;

  @Field(() => String, {
    description: 'Description of the product',
    nullable: false,
  })
  description: string;

  @Field(() => Float, {
    description: 'Price of the product',
    nullable: false,
  })
  price: number;

  @Field(() => Int, {
    description: 'Number of items of the product in stock',
    nullable: false,
  })
  stock: number;
}
