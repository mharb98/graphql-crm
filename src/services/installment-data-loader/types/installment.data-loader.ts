import DataLoader from 'dataloader';
import { PurchaseEntity } from '../../../data-access/entities/purchase.entity';

export interface InstallmentDataLoaders {
  purchasesDataLoader: DataLoader<number, PurchaseEntity>;
}
