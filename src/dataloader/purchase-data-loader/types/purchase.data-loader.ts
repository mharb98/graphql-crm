import DataLoader from 'dataloader';
import { CustomerEntity } from '../../../data-access/entities/customer.entity';
import { UserEntity } from '../../../data-access/entities/user.entity';
import { PurchaseProductEntity } from '../../../data-access/entities/purchase-product.entity';
import { InstallmentEntity } from '../../../data-access/entities/installment.entity';

export interface PurchaseDataLoader {
  customersDataLoader: DataLoader<number, CustomerEntity>;
  salesAgentDataLoader: DataLoader<number, UserEntity>;
  purchaseProductsDataLoader: DataLoader<number, PurchaseProductEntity[]>;
  installmentsDataLoader: DataLoader<number, InstallmentEntity[]>;
}
