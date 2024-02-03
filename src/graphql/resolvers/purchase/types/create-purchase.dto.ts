import { Field, Float, InputType } from '@nestjs/graphql';

@InputType({ description: 'Input for the creation of a new purchase' })
export class CreatePurchaseDTO {
  @Field(() => Float)
  tempFied: number;
}
