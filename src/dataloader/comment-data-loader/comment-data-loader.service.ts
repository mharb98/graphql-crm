import { Injectable } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { CustomersService } from '../../services/customers/customers.service';
import { CommentDataLoader } from './types/comment.data-loader';
import * as DataLoader from 'dataloader';
import { UserEntity } from '../../data-access/entities/user.entity';
import { CustomerEntity } from '../../data-access/entities/customer.entity';

@Injectable()
export class CommentDataLoaderService {
  constructor(
    private readonly usersService: UsersService,
    private readonly customersService: CustomersService,
  ) {}

  getDataLoaders(): CommentDataLoader {
    return {
      userDataLoader: this.createUserDataLoader(),
      customerDataLoader: this.createCustomerDataLoader(),
    };
  }

  private createUserDataLoader() {
    return new DataLoader<number, UserEntity>(
      async (keys: readonly number[]) =>
        await this.usersService.getCommentsUsers(keys as number[]),
    );
  }

  private createCustomerDataLoader() {
    return new DataLoader<number, CustomerEntity>(
      async (keys: readonly number[]) =>
        await this.customersService.getCommentsCustomers(keys as number[]),
    );
  }
}
