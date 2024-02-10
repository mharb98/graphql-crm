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
import { CreateCustomerDTO } from './types/create-customer.dto';
import { UpdateCustomerDTO } from './types/update-customer.dto';
import { CustomerEntity } from '../../../data-access/entities/customer.entity';
import { BaseResolver } from '../base.resolver';
import { CustomersService } from '../../../services/customers/customers.service';
import { CustomerDataLoader } from '../../../dataloader/customer-data-loader/types/customer.data-loader';
import { ContactInfoService } from '../../../services/contact-info/contact-info.service';

@Resolver(() => CustomerEntity)
export class CustomerResolver extends BaseResolver(CustomerEntity) {
  constructor(
    private readonly customersService: CustomersService,
    private readonly contactInfoService: ContactInfoService,
  ) {
    super();
  }

  @Query(() => [CustomerEntity], {
    name: 'QueryCustomers',
    description: 'Query customers and returns a paginated customers result',
  })
  async queryCustomers() {
    return await this.customersService.queryCustomers();
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
    const customer = await this.customersService.createCustomer(
      createCustomerDTO,
    );

    await this.contactInfoService.createCustomerContactInfo(
      customer.id,
      createCustomerDTO.contactInfo,
    );

    return customer;
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
  async salesAgent(
    @Parent() customer: CustomerEntity,
    @Context()
    { customerDataLoaders }: { customerDataLoaders: CustomerDataLoader },
  ) {
    const { id } = customer;
    const { salesAgentsLoader } = customerDataLoaders;
    return await salesAgentsLoader.load(id);
  }

  @ResolveField()
  async contactInfo(
    @Parent() customer: CustomerEntity,
    @Context()
    { customerDataLoaders }: { customerDataLoaders: CustomerDataLoader },
  ) {
    const { id } = customer;
    const { contactInfoLoader } = customerDataLoaders;
    return await contactInfoLoader.load(id);
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
  async comments(
    @Parent() customer: CustomerEntity,
    @Context()
    { customerDataLoaders }: { customerDataLoaders: CustomerDataLoader },
  ) {
    const { id } = customer;
    const { commentsLoader } = customerDataLoaders;

    return await commentsLoader.load(id);
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
