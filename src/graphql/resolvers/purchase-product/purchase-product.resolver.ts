import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PurchaseProductEntity } from '../../../data-access/entities/purchase-product.entity';
import { BaseResolver } from '../base.resolver';
import { UpdatePurchaseProductDTO } from './types/update-purchase-product.dto';
import { PurchaseProductsService } from '../../../services/purchase-products/purchase-products.service';
import { CreatePurchaseProductDTO } from './types/create-purchase-product.dto';
import { PurchaseProductDataLoader } from '../../../dataloader/purchase-product-data-loader/types/purchase-product.data-loader';

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
  async product(
    @Parent() purchaseProduct: PurchaseProductEntity,
    @Context()
    {
      purchaseProductDataLoaders,
    }: { purchaseProductDataLoaders: PurchaseProductDataLoader },
  ) {
    const { id } = purchaseProduct;
    const { productDataLoader } = purchaseProductDataLoaders;
    return await productDataLoader.load(id);
  }

  @ResolveField()
  async purchase(
    @Parent() purchaseProduct: PurchaseProductEntity,
    @Context()
    {
      purchaseProductDataLoaders,
    }: { purchaseProductDataLoaders: PurchaseProductDataLoader },
  ) {
    const { id } = purchaseProduct;
    const { purchaseDataLoader } = purchaseProductDataLoaders;

    return await purchaseDataLoader.load(id);
  }
}
