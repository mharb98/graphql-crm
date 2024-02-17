import { Injectable } from '@nestjs/common';
import { IDataloaders } from './dataloader.interface';
import { CustomerDataLoaderService } from './customer-data-loader/customer-data-loader.service';
import { ContactInfoDataLoaderService } from './contact-info-data-loader/contact-info-data-loader.service';
import { PurchaseDataLoaderService } from './purchase-data-loader/purchase-data-loader.service';

@Injectable()
export class DataloaderService {
  constructor(
    private readonly customerDataLoaderService: CustomerDataLoaderService,
    private readonly contactInfoDataLoaderService: ContactInfoDataLoaderService,
    private readonly purchaseDataLoaderService: PurchaseDataLoaderService,
  ) {}

  getLoaders(): IDataloaders {
    return {
      customerDataLoaders: this.customerDataLoaderService.getLoaders(),
      contactInfoDataLoaders: this.contactInfoDataLoaderService.getLoaders(),
      purchaseDataLoaders: this.purchaseDataLoaderService.getDataLoaders(),
    };
  }
}
