import DataLoader from 'dataloader';
import { UserEntity } from '../data-access/entities/user.entity';

export interface IDataloaders {
  usersLoader: DataLoader<number, UserEntity>;
}
