import { ResolveField, Resolver } from '@nestjs/graphql';
import { InstallmentEntity } from '../../data-access/entities/installment.entity';

@Resolver(() => InstallmentEntity)
export class InstallmentsResolver {
  @ResolveField()
  async purchase() {
    return {
      totalPrice: 340,
      taxes: 23.5,
      totalDiscount: 19.5,
    };
  }
}
