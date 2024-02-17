import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { DataAccessModule } from '../data-access/data-access.module';
import { CustomersService } from './customers/customers.service';
import { CommentsService } from './comments/comments.service';
import { ContactInfoService } from './contact-info/contact-info.service';
import { ProductService } from './product/product.service';
import { StatusService } from './status/status.service';
import { PurchaseService } from './purchase/purchase.service';
import { PurchaseProductsService } from './purchase-products/purchase-products.service';
import { InstallmentsService } from './installments/installments.service';
import { InstallmentDataLoaderService } from './installment-data-loader/installment-data-loader.service';
@Module({
  imports: [DataAccessModule],
  providers: [
    UsersService,
    CustomersService,
    CommentsService,
    ContactInfoService,
    ProductService,
    StatusService,
    PurchaseService,
    PurchaseProductsService,
    InstallmentsService,
    InstallmentDataLoaderService,
  ],
  exports: [
    UsersService,
    CustomersService,
    CommentsService,
    ContactInfoService,
    ProductService,
    StatusService,
    PurchaseService,
    PurchaseProductsService,
    InstallmentsService,
  ],
})
export class ServicesModule {}
