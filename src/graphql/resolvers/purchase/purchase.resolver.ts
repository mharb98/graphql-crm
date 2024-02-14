import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PurchaseEntity } from '../../../data-access/entities/purchase.entity';
import { CreatePurchaseDTO } from './types/create-purchase.dto';
import { UpdatePurchaseDTO } from './types/update-purchase.dto';
import { BaseResolver } from '../base.resolver';
import { PurchaseService } from '../../../services/purchase/purchase.service';

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

  @Mutation(() => PurchaseEntity, {
    description: 'Update an existing purchase',
  })
  async updatePurchase(
    @Args('id', {
      type: () => Int,
      description: 'Id of the purchase to be updated',
    })
    id: number,
    @Args('updatePurchaseDto') updatePurchaseDto: UpdatePurchaseDTO,
  ) {
    return await this.purchaseService.updatePurchase(id, updatePurchaseDto);
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
  async customer() {
    return {
      id: 1,
      firstName: 'Marwan',
      lastName: 'Salah',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @ResolveField()
  async products() {
    return [
      {
        amount: 2,
        discount: 30.5,
      },
      {
        amount: 4,
        discount: 70.2,
      },
    ];
  }

  @ResolveField()
  async installments() {
    return [
      {
        amount: 20.4,
        dueDate: new Date(),
      },
      {
        amount: 10.1,
        dueDate: new Date(),
      },
    ];
  }
}
