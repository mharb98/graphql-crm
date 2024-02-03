import { ResolveField, Resolver } from '@nestjs/graphql';
import { PurchaseProductEntity } from '../../../data-access/entities/purchase-product.entity';
import { BaseResolver } from '../base.resolver';

@Resolver(() => PurchaseProductEntity)
export class PurchaseProductResolver extends BaseResolver(
  PurchaseProductEntity,
) {
  constructor() {
    super();
  }

  @ResolveField()
  async product() {
    return {
      id: 1,
      name: 'Flash Light',
      description: 'Light your way in the darkness',
      price: 100,
      stock: 3,
      rating: 4.5,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @ResolveField()
  async purchase() {
    return {
      totalPrice: 340,
      taxes: 23.5,
      totalDiscount: 19.5,
    };
  }
}
