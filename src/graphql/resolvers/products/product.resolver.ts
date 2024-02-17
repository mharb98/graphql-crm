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
import { CreateProductDTO } from './types/create-product.dto';
import { ProductEntity } from '../../../data-access/entities/product.entity';
import { BaseResolver } from '../base.resolver';
import { ProductService } from '../../../services/product/product.service';
import { UpdateProductDTO } from './types/update-product.dto';
import { ProductDataLoader } from '../../../dataloader/product-data-loader/types/product.data-loader';

@Resolver(() => ProductEntity)
export class ProductResolver extends BaseResolver(ProductEntity) {
  constructor(private readonly productService: ProductService) {
    super();
  }

  @Query(() => ProductEntity, {
    name: 'product',
    description: 'Returns a product for the specified ID',
  })
  async getProduct(
    @Args('id', {
      type: () => Int,
      description: 'ID of the product that needs to be returned',
    })
    id: number,
  ) {
    return await this.productService.findOne(id);
  }

  @Query(() => [ProductEntity], {
    name: 'QueryProducts',
    description: 'Returns a list of paginated products',
  })
  async queryProducts() {
    return [
      {
        id: 1,
        name: 'Flash Light',
        description: 'Light your way in the darkness',
        price: 100,
        stock: 3,
        rating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Night Lamp',
        description: 'Light your way in the bedroom',
        price: 150,
        stock: 7,
        rating: 4.2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }

  @Mutation(() => ProductEntity, {
    name: 'createProduct',
    description: 'Creates and returns a product',
  })
  async createProduct(
    @Args('createProductDTO') createProductDto: CreateProductDTO,
  ) {
    return await this.productService.createProduct(createProductDto);
  }

  @Mutation(() => ProductEntity, {
    name: 'updateProduct',
    description: 'Updates and returns a product',
  })
  async updateProduct(
    @Args('id', {
      type: () => Int,
      description: 'ID of the product to be updated',
    })
    id: number,
    @Args('updateProductDTO') updateProductDto: UpdateProductDTO,
  ) {
    return await this.productService.updateProduct(id, updateProductDto);
  }

  @ResolveField()
  async purchases(
    @Parent() product: ProductEntity,
    @Context()
    { productDataLoaders }: { productDataLoaders: ProductDataLoader },
  ) {
    const { id } = product;
    const { purchaseProductLoader } = productDataLoaders;

    return purchaseProductLoader.load(id);
  }
}
