import { Injectable } from '@nestjs/common';
import { PurchaseProductsService } from '../../services/purchase-products/purchase-products.service';
import { ProductDataLoader } from './types/product.data-loader';
import * as DataLoader from 'dataloader';
import { PurchaseProductEntity } from '../../data-access/entities/purchase-product.entity';

@Injectable()
export class ProductDataLoaderService {
  constructor(
    private readonly purchaseProductService: PurchaseProductsService,
  ) {}

  public getDataLoaders(): ProductDataLoader {
    return {
      purchaseProductLoader: this.createPurchaseProductLoader(),
    };
  }

  private createPurchaseProductLoader() {
    return new DataLoader<number, PurchaseProductEntity[]>(
      async (keys: readonly number[]) =>
        await this.purchaseProductService.getProductPurchases(keys as number[]),
    );
  }
}
