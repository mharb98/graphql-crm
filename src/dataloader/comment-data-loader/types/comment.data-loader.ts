import DataLoader from 'dataloader';
import { UserEntity } from '../../../data-access/entities/user.entity';
import { CustomerEntity } from '../../../data-access/entities/customer.entity';

export interface CommentDataLoader {
  userDataLoader: DataLoader<number, UserEntity>;
  customerDataLoader: DataLoader<number, CustomerEntity>;
}
