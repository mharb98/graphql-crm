import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType({ description: 'Input for the creation of a new installment' })
export class CreateInstallmentDTO {
  @Field(() => Int, {
    description:
      'ID of the purchase for which the installment is being created',
    nullable: false,
  })
  purchaseId: number;

  @Field(() => Float, {
    description: 'The amount that is due for the purchase',
    nullable: false,
  })
  amount: number;

  @Field({ description: 'Due date of the installment', nullable: false })
  dueData: Date;
}
