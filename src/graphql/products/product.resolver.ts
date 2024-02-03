import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './types/product.model';
import { CreateProductDTO } from './types/create-product.dto';

@Resolver(() => Product)
export class ProductResolver {
  constructor() {}

  @Query(() => Product, {
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
    console.log(id);

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

  @Query(() => [Product], {
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

  @Mutation(() => Product, {
    name: 'createProduct',
    description: 'Creates and returns a product',
  })
  async createProduct(
    @Args('createProductDTO') createProductDto: CreateProductDTO,
  ) {
    console.log(createProductDto);
  }
}
