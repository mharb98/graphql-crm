import { Field, InputType } from '@nestjs/graphql';
import { PurchaseProductDTO } from '../../purchase/types/purchase-product.dto';

@InputType({ description: 'Add a purchase product to an existing purchase' })
export class CreatePurchaseProductDTO extends PurchaseProductDTO {
  @Field({
    description: 'Purchase ID for which the purchase product is being added',
  })
  purchaseId: number;
}
