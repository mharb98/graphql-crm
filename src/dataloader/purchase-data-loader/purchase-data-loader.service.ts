import { Injectable } from '@nestjs/common';
import { PurchaseService } from '../../services/purchase/purchase.service';
import { PurchaseProductsService } from '../../services/purchase-products/purchase-products.service';
import { PurchaseDataLoader } from './types/purchase.data-loader';
import * as DataLoader from 'dataloader';
import { CustomerEntity } from '../../data-access/entities/customer.entity';
import { UserEntity } from '../../data-access/entities/user.entity';
import { PurchaseProductEntity } from '../../data-access/entities/purchase-product.entity';
import { InstallmentEntity } from '../../data-access/entities/installment.entity';
import { CustomersService } from '../../services/customers/customers.service';
import { UsersService } from '../../services/users/users.service';

@Injectable()
export class PurchaseDataLoaderService {
  constructor(
    private readonly purchaseService: PurchaseService,
    private readonly purchaseProductService: PurchaseProductsService,
    private readonly usersService: UsersService,
    private readonly customersService: CustomersService,
  ) {}

  public getDataLoaders(): PurchaseDataLoader {
    return {
      customersDataLoader: this.createCustomersDataLoader(),
      salesAgentDataLoader: this.createSalesAgentsDataLoader(),
      purchaseProductsDataLoader: this.createPurchaseProductDataLoader(),
      installmentsDataLoader: this.createInstallmentDataLoader(),
    };
  }

  private createCustomersDataLoader() {
    return new DataLoader<number, CustomerEntity>(
      async (keys: readonly number[]) =>
        await this.customersService.getPurchaseCustomers(keys as number[]),
    );
  }

  private createSalesAgentsDataLoader() {
    return new DataLoader<number, UserEntity>(async (keys: readonly number[]) =>
      this.usersService.getPurchaseSalesAgents(keys as number[]),
    );
  }

  private createPurchaseProductDataLoader() {
    return new DataLoader<number, PurchaseProductEntity[]>(
      async (keys: readonly number[]) => [],
    );
  }

  private createInstallmentDataLoader() {
    return new DataLoader<number, InstallmentEntity[]>(
      async (keys: readonly number[]) => [],
    );
  }
}
