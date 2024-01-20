import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Customer } from './types/customer.model';
import { CreateCustomerDTO } from './types/create-customer.dto';
import { UpdateCustomerDTO } from './types/update-customer.dto';

@Resolver((of) => Customer)
export class CustomerResolver {
  constructor() {}

  @Query((returns) => Customer, {
    name: 'customer',
    description: 'Returns a customer object of specified id',
  })
  async getCustomer(
    @Args('id', {
      type: () => Int,
      description: 'ID of the needed customer to be returned',
    })
    id: number,
  ) {
    return {
      id: id,
      firstName: 'Marwan',
      lastName: 'Salah',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @Mutation((returns) => Customer)
  async createCustomer(
    @Args('createCustomerDTO') createCustomerDTO: CreateCustomerDTO,
  ) {
    console.log(createCustomerDTO);
    return {
      id: 1,
      firstName: 'Marwan',
      lastName: 'Salah',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @Mutation((returns) => Customer)
  async updateCustomer(
    @Args('updateCustomerDTO') updateCustomerDTO: UpdateCustomerDTO,
  ) {
    console.log(updateCustomerDTO);

    return {
      id: 1,
      firstName: 'Marwan',
      lastName: 'Salah',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @ResolveField()
  async salesAgent() {
    return {
      id: 1,
      firstName: 'Marwan',
      middleName: 'Salah',
      lastName: 'Ragheb',
      email: 'marwanharb65@outlook.com',
      phoneNumber: '+201013747167',
      banned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @ResolveField()
  async contactInfo() {
    return [
      {
        id: 1,
        value: 'example@exampledomain.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1,
        value: '+201013949494',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }
}
