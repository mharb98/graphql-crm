import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType({ description: 'Input for updating an existing purchase product' })
export class UpdatePurchaseProductDTO {
  @Field(() => Int, { description: 'Number of items purchased from a product' })
  amount?: number;

  @Field(() => Float, {
    description: 'Discount applied for a specific purchase product',
  })
  discount?: number;
}
