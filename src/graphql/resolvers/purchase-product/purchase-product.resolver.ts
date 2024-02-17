import { Args, Int, Mutation, ResolveField, Resolver } from '@nestjs/graphql';
import { PurchaseProductEntity } from '../../../data-access/entities/purchase-product.entity';
import { BaseResolver } from '../base.resolver';
import { UpdatePurchaseProductDTO } from './types/update-purchase-product.dto';
import { PurchaseProductsService } from '../../../services/purchase-products/purchase-products.service';
import { CreatePurchaseProductDTO } from './types/create-purchase-product.dto';

@Resolver(() => PurchaseProductEntity)
export class PurchaseProductResolver extends BaseResolver(
  PurchaseProductEntity,
) {
  constructor(
    private readonly purchaseProductService: PurchaseProductsService,
  ) {
    super();
  }

  @Mutation(() => PurchaseProductEntity, {
    description: 'Adds a new product to a specific purchase',
  })
  async createPurchaseProduct(
    @Args('createPurchaseProductDto')
    createPurchaseProductDto: CreatePurchaseProductDTO,
  ): Promise<PurchaseProductEntity> {
    return await this.purchaseProductService.createPurchaseProduct(
      createPurchaseProductDto,
    );
  }

  @Mutation(() => PurchaseProductEntity, {
    description: 'Update a purchase product entity by id',
  })
  async updatePurchaseProduct(
    @Args('id', {
      type: () => Int,
      description: 'ID of the purchase product to be updated',
    })
    id: number,
    @Args('UpdatePurchaseProductDTO')
    updatePurchaseProductDto: UpdatePurchaseProductDTO,
  ): Promise<PurchaseProductEntity> {
    return await this.purchaseProductService.updatePurchaseProduct(
      id,
      updatePurchaseProductDto,
    );
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
