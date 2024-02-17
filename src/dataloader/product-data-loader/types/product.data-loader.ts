import DataLoader from 'dataloader';
import { PurchaseProductEntity } from '../../../data-access/entities/purchase-product.entity';

export interface ProductDataLoader {
  purchaseProductLoader: DataLoader<number, PurchaseProductEntity[]>;
}
