import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PurchaseEntity } from '../../../data-access/entities/purchase.entity';
import { CreatePurchaseDTO } from './types/create-purchase.dto';
import { BaseResolver } from '../base.resolver';
import { PurchaseService } from '../../../services/purchase/purchase.service';
import { PurchaseDataLoader } from '../../../dataloader/purchase-data-loader/types/purchase.data-loader';

@Resolver(() => PurchaseEntity)
export class PurchaseResolver extends BaseResolver(PurchaseEntity) {
  constructor(private readonly purchaseService: PurchaseService) {
    super();
  }

  @Query(() => PurchaseEntity, {
    name: 'purchase',
    description: 'Returns a purchase for the specified id in the query',
  })
  async getPurchase(
    @Args('id', {
      type: () => Int,
      description: 'ID of the purchase to be returned',
    })
    id: number,
  ) {
    return await this.purchaseService.findOne(id);
  }

  @Mutation(() => PurchaseEntity, { description: 'Create a new purchase' })
  async createPurchase(
    @Args('customerId', {
      type: () => Int,
      description: 'ID of the user record being updated',
    })
    customerId: number,
    @Args('createPurchaseDto') createPurchaseDto: CreatePurchaseDTO,
  ) {
    return await this.purchaseService.createPurchase(
      customerId,
      createPurchaseDto,
    );
  }

  @Mutation(() => PurchaseEntity, { description: 'Delete a purchase' })
  async deletePurchase(
    @Args('id', {
      type: () => Int,
      description: 'ID of the purchase to be deleted',
    })
    id: number,
  ) {
    console.log(id);

    return {
      totalPrice: 340,
      taxes: 23.5,
      totalDiscount: 19.5,
    };
  }

  @ResolveField()
  async customer(
    @Parent() purchase: PurchaseEntity,
    @Context()
    { purchaseDataLoaders }: { purchaseDataLoaders: PurchaseDataLoader },
  ) {
    const { id } = purchase;
    const { customersDataLoader } = purchaseDataLoaders;

    return await customersDataLoader.load(id);
  }

  @ResolveField()
  async salesAgent(
    @Parent() purchase: PurchaseEntity,
    @Context()
    { purchaseDataLoaders }: { purchaseDataLoaders: PurchaseDataLoader },
  ) {
    const { id } = purchase;
    const { salesAgentDataLoader } = purchaseDataLoaders;

    return await salesAgentDataLoader.load(id);
  }

  @ResolveField()
  async products(
    @Parent() purchase: PurchaseEntity,
    @Context()
    { purchaseDataLoaders }: { purchaseDataLoaders: PurchaseDataLoader },
  ) {
    const { id } = purchase;
    const { purchaseProductsDataLoader } = purchaseDataLoaders;

    return await purchaseProductsDataLoader.load(id);
  }

  @ResolveField()
  async installments(
    @Parent() purchase: PurchaseEntity,
    @Context()
    { purchaseDataLoaders }: { purchaseDataLoaders: PurchaseDataLoader },
  ) {
    const { id } = purchase;
    const { installmentsDataLoader } = purchaseDataLoaders;

    return await installmentsDataLoader.load(id);
  }
}
