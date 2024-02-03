import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateProductDTO } from './types/create-product.dto';
import { ProductEntity } from '../../data-access/entities/product.entity';

@Resolver(() => ProductEntity)
export class ProductResolver {
  constructor() {}

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
    console.log(createProductDto);

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
  async purchases() {
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
}
