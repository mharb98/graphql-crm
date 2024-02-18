import { Module } from '@nestjs/common';
import { DataloaderService } from './dataloader.service';
import { ServicesModule } from '../services/services.module';
import { CustomerDataLoaderService } from './customer-data-loader/customer-data-loader.service';
import { ContactInfoDataLoaderService } from './contact-info-data-loader/contact-info-data-loader.service';
import { PurchaseDataLoaderService } from './purchase-data-loader/purchase-data-loader.service';
import { ProductDataLoaderService } from './product-data-loader/product-data-loader.service';
import { PurchaseProductDataLoaderService } from './purchase-product-data-loader/purchase-product-data-loader.service';
import { InstallmentDataLoaderService } from './installment-data-loader/installment-data-loader.service';
import { CommentDataLoaderService } from './comment-data-loader/comment-data-loader.service';
import { StatusUpdateDataLoaderService } from './status-update-data-loader/status-update-data-loader.service';

@Module({
  imports: [ServicesModule],
  providers: [
    DataloaderService,
    CustomerDataLoaderService,
    ContactInfoDataLoaderService,
    PurchaseDataLoaderService,
    ProductDataLoaderService,
    PurchaseProductDataLoaderService,
    InstallmentDataLoaderService,
    CommentDataLoaderService,
    StatusUpdateDataLoaderService,
  ],
  exports: [
    DataloaderService,
    CustomerDataLoaderService,
    ContactInfoDataLoaderService,
  ],
})
export class DataloaderModule {}
