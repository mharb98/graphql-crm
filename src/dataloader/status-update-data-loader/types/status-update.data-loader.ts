import DataLoader from 'dataloader';
import { CustomerEntity } from '../../../data-access/entities/customer.entity';
import { UserEntity } from '../../../data-access/entities/user.entity';
import { StatusEntity } from '../../../data-access/entities/status.entity';

export interface StatusUpdateDataLoader {
  customerDataLoader: DataLoader<number, CustomerEntity>;
  userDataLoader: DataLoader<number, UserEntity>;
  statusDataLoader: DataLoader<number, StatusEntity>;
}
