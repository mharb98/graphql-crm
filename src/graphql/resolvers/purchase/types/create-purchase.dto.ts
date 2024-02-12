import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { PurchaseProductDTO } from './purchase-product.dto';

@InputType({ description: 'Input for the creation of a new purchase' })
export class CreatePurchaseDTO {
  @Field(() => [PurchaseProductDTO], {
    description: 'A list of products to be purchased',
  })
  purchaseProducts: PurchaseProductDTO[];
}
