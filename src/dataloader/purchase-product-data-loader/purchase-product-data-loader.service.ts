import { Injectable } from '@nestjs/common';
import { PurchaseProductDataLoader } from './types/purchase-product.data-loader';
import * as DataLoader from 'dataloader';
import { ProductEntity } from '../../data-access/entities/product.entity';
import { PurchaseEntity } from '../../data-access/entities/purchase.entity';
import { PurchaseService } from '../../services/purchase/purchase.service';
import { ProductService } from '../../services/product/product.service';

@Injectable()
export class PurchaseProductDataLoaderService {
  constructor(
    private readonly purchaseService: PurchaseService,
    private readonly productService: ProductService,
  ) {}

  public getDataLoaders(): PurchaseProductDataLoader {
    return {
      productDataLoader: this.createProductDataLoader(),
      purchaseDataLoader: this.createPurchaseDataLoader(),
    };
  }

  private createProductDataLoader(): DataLoader<number, ProductEntity> {
    return new DataLoader<number, ProductEntity>(
      async (keys: readonly number[]) =>
        await this.productService.getProductByPurchase(keys as number[]),
    );
  }

  private createPurchaseDataLoader(): DataLoader<number, PurchaseEntity> {
    return new DataLoader<number, PurchaseEntity>(
      async (keys: readonly number[]) =>
        await this.purchaseService.getPurchaseByProduct(keys as number[]),
    );
  }
}
