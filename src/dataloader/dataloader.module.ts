import { Module } from '@nestjs/common';
import { DataloaderService } from './dataloader.service';
import { ServicesModule } from '../services/services.module';
import { CustomerDataLoaderService } from './customer-data-loader/customer-data-loader.service';
import { ContactInfoDataLoaderService } from './contact-info-data-loader/contact-info-data-loader.service';

@Module({
  imports: [ServicesModule],
  providers: [
    DataloaderService,
    CustomerDataLoaderService,
    ContactInfoDataLoaderService,
  ],
  exports: [
    DataloaderService,
    CustomerDataLoaderService,
    ContactInfoDataLoaderService,
  ],
})
export class DataloaderModule {}
