import { Module } from '@nestjs/common';
import { CustomersRepository } from './repositories/customer.repository';
import { UserRepository } from './repositories/user.repository';
import { CommentsRepository } from './repositories/comment.repository';
import { ContactInfoRepository } from './repositories/contact-info.repository';
import { ProductRepository } from './repositories/product.repository';
import { StatusRepository } from './repositories/status.repository';
import { PurchaseRepository } from './repositories/purchase.repository';
import { PurchaseProductRepository } from './repositories/purchase-product.repository';
import { InstallmentsRepository } from './repositories/installments.repository';

@Module({
  imports: [],
  providers: [
    CustomersRepository,
    UserRepository,
    CommentsRepository,
    ContactInfoRepository,
    ProductRepository,
    StatusRepository,
    PurchaseRepository,
    PurchaseProductRepository,
    InstallmentsRepository,
  ],
  exports: [
    CustomersRepository,
    UserRepository,
    CommentsRepository,
    ContactInfoRepository,
    ProductRepository,
    StatusRepository,
    PurchaseRepository,
    PurchaseProductRepository,
    InstallmentsRepository,
  ],
})
export class DataAccessModule {}
