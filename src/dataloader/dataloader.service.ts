import { Injectable } from '@nestjs/common';
import { IDataloaders } from './dataloader.interface';
import { CustomerDataLoaderService } from './customer-data-loader/customer-data-loader.service';
import { ContactInfoDataLoaderService } from './contact-info-data-loader/contact-info-data-loader.service';

@Injectable()
export class DataloaderService {
  constructor(
    private readonly customerDataLoaderService: CustomerDataLoaderService,
    private readonly contactInfoDataLoaderService: ContactInfoDataLoaderService,
  ) {}

  getLoaders(): IDataloaders {
    return {
      customerDataLoaders: this.customerDataLoaderService.getLoaders(),
      contactInfoDataLoaders: this.contactInfoDataLoaderService.getLoaders(),
    };
  }
}
