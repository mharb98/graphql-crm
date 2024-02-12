import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType({ description: 'Input type for updating a product' })
export class UpdateProductDTO {
  @Field(() => String, { description: 'Product Name', nullable: true })
  name?: string;

  @Field(() => String, { description: 'Product Description', nullable: true })
  description?: string;

  @Field(() => Float, { description: 'Product Price', nullable: true })
  price?: number;

  @Field(() => Int, {
    description: 'Number of items for a product',
    nullable: true,
  })
  stock?: number;
}
