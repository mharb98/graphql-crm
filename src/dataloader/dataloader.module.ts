import { Module } from '@nestjs/common';
import { DataloaderService } from './dataloader.service';
import { ServicesModule } from '../services/services.module';
import { CustomerDataLoaderService } from './customer-data-loader/customer-data-loader.service';

@Module({
  imports: [ServicesModule],
  providers: [DataloaderService, CustomerDataLoaderService],
  exports: [DataloaderService, CustomerDataLoaderService],
})
export class DataloaderModule {}
