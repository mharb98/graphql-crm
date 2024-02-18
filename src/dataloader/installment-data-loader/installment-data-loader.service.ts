import { Injectable } from '@nestjs/common';
import { InstallmentDataLoaders } from './types/installment.data-loader';
import * as DataLoader from 'dataloader';
import { PurchaseEntity } from '../../data-access/entities/purchase.entity';
import { PurchaseService } from '../../services/purchase/purchase.service';

@Injectable()
export class InstallmentDataLoaderService {
  constructor(private readonly purchaseService: PurchaseService) {}

  getDataLoaders(): InstallmentDataLoaders {
    return {
      purchasesDataLoader: this.createPurchaseDataLoader(),
    };
  }

  private createPurchaseDataLoader() {
    return new DataLoader<number, PurchaseEntity>(
      async (keys: readonly number[]) =>
        await this.purchaseService.getInstallmentPurchases(keys as number[]),
    );
  }
}
