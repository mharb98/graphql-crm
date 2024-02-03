import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PurchaseEntity } from '../../data-access/entities/purchase.entity';
import { CreatePurchaseDTO } from './types/create-purchase.dto';
import { UpdatePurchaseDTO } from './types/update-purchase.dto';

@Resolver(() => PurchaseEntity)
export class PurchaseResolver {
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
    console.log(id);

    return {
      totalPrice: 340,
      taxes: 23.5,
      totalDiscount: 19.5,
    };
  }

  @Mutation(() => PurchaseEntity, { description: 'Create a new purchase' })
  async createPurchase(
    @Args('customerId', {
      type: () => Int,
      description: 'ID of the customer for which the purchase is being added',
    })
    customerId: number,
    @Args('createPurchaseDto') createPurchaseDto: CreatePurchaseDTO,
  ) {
    console.log(customerId);
    console.log(createPurchaseDto);

    return {
      totalPrice: 340,
      taxes: 23.5,
      totalDiscount: 19.5,
    };
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
    console.log(id);
    console.log(updatePurchaseDto);

    return {
      totalPrice: 340,
      taxes: 23.5,
      totalDiscount: 19.5,
    };
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
