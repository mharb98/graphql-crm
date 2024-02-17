import DataLoader from 'dataloader';
import { ProductEntity } from '../../../data-access/entities/product.entity';
import { PurchaseEntity } from '../../../data-access/entities/purchase.entity';

export interface PurchaseProductDataLoader {
  productDataLoader: DataLoader<number, ProductEntity>;
  purchaseDataLoader: DataLoader<number, PurchaseEntity>;
}
