import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateCustomerDTO } from './types/create-customer.dto';
import { UpdateCustomerDTO } from './types/update-customer.dto';
import { CustomerEntity } from '../../../data-access/entities/customer.entity';
import { BaseResolver } from '../base.resolver';
import { CustomersService } from '../../../services/customers/customers.service';

@Resolver(() => CustomerEntity)
export class CustomerResolver extends BaseResolver(CustomerEntity) {
  constructor(private readonly customersService: CustomersService) {
    super();
  }

  @Query(() => CustomerEntity, {
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
    return await this.customersService.findOne(id);
  }

  @Mutation(() => CustomerEntity)
  async createCustomer(
    @Args('createCustomerDTO') createCustomerDTO: CreateCustomerDTO,
  ) {
    return await this.customersService.createCustomer(createCustomerDTO);
  }

  @Mutation(() => CustomerEntity)
  async updateCustomer(
    @Args('id', {
      type: () => Int,
      description: 'ID of customer record being updated',
    })
    id: number,
    @Args('updateCustomerDTO') updateCustomerDTO: UpdateCustomerDTO,
  ) {
    return await this.customersService.updateCustomer(id, updateCustomerDTO);
  }

  @Mutation(() => CustomerEntity)
  async deleteCustomer(
    @Args('id', {
      type: () => Int,
      description: 'ID of the customer that has to be deleted',
    })
    id: number,
  ) {
    await this.customersService.deleteCustomer(id);
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

  @ResolveField()
  async purchases() {
    return [
      {
        totalPrice: 100.5,
        taxes: 23.4,
        totalDiscount: 10.2,
      },
      {
        totalPrice: 230.2,
        taxes: 50.0,
        totalDiscount: 19.2,
      },
    ];
  }

  @ResolveField()
  async comments() {
    return [
      {
        comment: 'Comment 1',
      },
      {
        comment: 'Comment 2',
      },
    ];
  }

  @ResolveField()
  async statusUpdates() {
    return [
      {
        comment: 'Comment 1',
        status: {
          name: 'Status 1',
        },
      },
      {
        comment: 'Comment 2',
        status: {
          name: 'Status 2',
        },
      },
    ];
  }
}
