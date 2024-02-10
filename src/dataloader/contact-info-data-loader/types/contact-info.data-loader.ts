import DataLoader from 'dataloader';
import { CustomerEntity } from '../../../data-access/entities/customer.entity';

export interface ContactInfoDataLoader {
  customersDataLoader: DataLoader<number, CustomerEntity>;
}
