import { Injectable } from '@nestjs/common';
import { CustomersService } from '../../services/customers/customers.service';
import { ContactInfoDataLoader } from './types/contact-info.data-loader';
import * as DataLoader from 'dataloader';
import { CustomerEntity } from '../../data-access/entities/customer.entity';

@Injectable()
export class ContactInfoDataLoaderService {
  constructor(private readonly customersService: CustomersService) {}

  getLoaders(): ContactInfoDataLoader {
    const customersDataLoader = this.createCustomersDataLoader();

    return {
      customersDataLoader,
    };
  }

  private createCustomersDataLoader() {
    return new DataLoader<number, CustomerEntity>(
      async (keys: readonly number[]) =>
        await this.customersService.getContactInfoCustomers(keys as number[]),
    );
  }
}
