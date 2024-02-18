import { Injectable } from '@nestjs/common';
import { IDataloaders } from './dataloader.interface';
import { CustomerDataLoaderService } from './customer-data-loader/customer-data-loader.service';
import { ContactInfoDataLoaderService } from './contact-info-data-loader/contact-info-data-loader.service';
import { PurchaseDataLoaderService } from './purchase-data-loader/purchase-data-loader.service';
import { ProductDataLoaderService } from './product-data-loader/product-data-loader.service';
import { PurchaseProductDataLoaderService } from './purchase-product-data-loader/purchase-product-data-loader.service';
import { InstallmentDataLoaderService } from './installment-data-loader/installment-data-loader.service';
import { CommentDataLoaderService } from './comment-data-loader/comment-data-loader.service';

@Injectable()
export class DataloaderService {
  constructor(
    private readonly customerDataLoaderService: CustomerDataLoaderService,
    private readonly contactInfoDataLoaderService: ContactInfoDataLoaderService,
    private readonly purchaseDataLoaderService: PurchaseDataLoaderService,
    private readonly productDataLoaderService: ProductDataLoaderService,
    private readonly purchaseProductDataLoaderService: PurchaseProductDataLoaderService,
    private readonly installmentDataLoaderService: InstallmentDataLoaderService,
    private readonly commentDataLoaderService: CommentDataLoaderService,
  ) {}

  getLoaders(): IDataloaders {
    return {
      customerDataLoaders: this.customerDataLoaderService.getLoaders(),
      contactInfoDataLoaders: this.contactInfoDataLoaderService.getLoaders(),
      purchaseDataLoaders: this.purchaseDataLoaderService.getDataLoaders(),
      productDataLoaders: this.productDataLoaderService.getDataLoaders(),
      purchaseProductDataLoaders:
        this.purchaseProductDataLoaderService.getDataLoaders(),
      installmentDataLoaders:
        this.installmentDataLoaderService.getDataLoaders(),
      commentDataLoaders: this.commentDataLoaderService.getDataLoaders(),
    };
  }
}
