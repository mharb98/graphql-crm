import { Field, Float, InputType } from '@nestjs/graphql';

@InputType({ description: 'Input type for updating an installment' })
export class UpdateInstallmentDTO {
  @Field(() => Float, {
    description: 'The amount that is due for the purchase',
    nullable: true,
  })
  amount?: number;

  @Field({ description: 'Due date of the installment', nullable: true })
  dueData?: Date;
}
