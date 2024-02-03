import { ResolveField, Resolver } from '@nestjs/graphql';
import { InstallmentEntity } from '../../../data-access/entities/installment.entity';
import { BaseResolver } from '../base.resolver';

@Resolver(() => InstallmentEntity)
export class InstallmentsResolver extends BaseResolver(InstallmentEntity) {
  constructor() {
    super();
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
