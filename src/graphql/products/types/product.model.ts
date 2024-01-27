import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field((type) => Int, {
    description: 'auto increment ID of the product model',
  })
  id: number;

  @Field({ description: 'Product name' })
  name: string;

  @Field({ description: 'Product description' })
  description: string;

  @Field((type) => Int, { description: 'Procuct price' })
  price: number;

  @Field((type) => Int, {
    description: 'Number of items in stock for this product',
  })
  stock: number;

  @Field((type) => Float, { description: 'Average rating of the product' })
  rating: number;

  @Field({ description: 'Creation date of the product' })
  createdAt: string;

  @Field({ description: 'Last update date of the product' })
  updatedAt: string;
}
