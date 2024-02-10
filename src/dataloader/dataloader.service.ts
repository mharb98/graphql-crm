import { Injectable } from '@nestjs/common';
import { IDataloaders } from './dataloader.interface';
import { CustomerDataLoaderService } from './customer-data-loader/customer-data-loader.service';

@Injectable()
export class DataloaderService {
  constructor(
    private readonly customerDataLoaderService: CustomerDataLoaderService,
  ) {}

  getLoaders(): IDataloaders {
    return {
      customerDataLoaders: this.customerDataLoaderService.getLoaders(),
    };
  }
}
