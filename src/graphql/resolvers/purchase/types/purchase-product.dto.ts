import { Field, InputType, Int } from '@nestjs/graphql';

@InputType({ description: 'Input for products purchased by a customer' })
export class PurchaseProductDTO {
  @Field(() => Int, {
    description: 'The number of items purchased from a specific product',
  })
  amount: number;

  @Field(() => Int, {
    description: 'The discount applied for the total amount of this product',
  })
  discount: number;

  @Field(() => Int, { description: 'The ID of the product to be purchased' })
  productId: number;
}
