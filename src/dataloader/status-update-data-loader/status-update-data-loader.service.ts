import { Injectable } from '@nestjs/common';
import { StatusUpdateDataLoader } from './types/status-update.data-loader';
import * as DataLoader from 'dataloader';
import { CustomerEntity } from '../../data-access/entities/customer.entity';
import { UserEntity } from '../../data-access/entities/user.entity';
import { StatusEntity } from '../../data-access/entities/status.entity';
import { CustomersService } from '../../services/customers/customers.service';
import { UsersService } from '../../services/users/users.service';
import { StatusService } from '../../services/status/status.service';

@Injectable()
export class StatusUpdateDataLoaderService {
  constructor(
    private readonly customerService: CustomersService,
    private readonly userService: UsersService,
    private readonly statusService: StatusService,
  ) {}

  getDataLoaders(): StatusUpdateDataLoader {
    return {
      customerDataLoader: this.createCustomerDataLoader(),
      userDataLoader: this.createUserDataLoader(),
      statusDataLoader: this.createStatusDataLoader(),
    };
  }

  private createCustomerDataLoader() {
    return new DataLoader<number, CustomerEntity>(
      async (keys: readonly number[]) => [],
    );
  }

  private createUserDataLoader() {
    return new DataLoader<number, UserEntity>(
      async (keys: readonly number[]) => [],
    );
  }

  private createStatusDataLoader() {
    return new DataLoader<number, StatusEntity>(
      async (keys: readonly number[]) => [],
    );
  }
}
