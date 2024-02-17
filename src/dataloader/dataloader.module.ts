import { Module } from '@nestjs/common';
import { DataloaderService } from './dataloader.service';
import { ServicesModule } from '../services/services.module';
import { CustomerDataLoaderService } from './customer-data-loader/customer-data-loader.service';
import { ContactInfoDataLoaderService } from './contact-info-data-loader/contact-info-data-loader.service';
import { PurchaseDataLoaderService } from './purchase-data-loader/purchase-data-loader.service';
import { ProductDataLoaderService } from './product-data-loader/product-data-loader.service';
import { PurchaseProductDataLoaderService } from './purchase-product-data-loader/purchase-product-data-loader.service';

@Module({
  imports: [ServicesModule],
  providers: [
    DataloaderService,
    CustomerDataLoaderService,
    ContactInfoDataLoaderService,
    PurchaseDataLoaderService,
    ProductDataLoaderService,
    PurchaseProductDataLoaderService,
  ],
  exports: [
    DataloaderService,
    CustomerDataLoaderService,
    ContactInfoDataLoaderService,
  ],
})
export class DataloaderModule {}
