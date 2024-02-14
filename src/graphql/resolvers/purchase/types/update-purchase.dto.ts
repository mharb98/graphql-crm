import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class UpdatePurchaseDTO {
  totalPrice?: number;

  @Field(() => Float, {
    description: 'Total Discount applied on the purchase',
    nullable: true,
  })
  totalDiscount?: number;

  @Field(() => Float, {
    description: 'Total Taxes for the purchase',
    nullable: true,
  })
  taxes?: number;
}
