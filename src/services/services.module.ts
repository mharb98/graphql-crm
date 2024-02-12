import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { DataAccessModule } from '../data-access/data-access.module';
import { CustomersService } from './customers/customers.service';
import { CommentsService } from './comments/comments.service';
import { ContactInfoService } from './contact-info/contact-info.service';
import { ProductService } from './product/product.service';
import { StatusService } from './status/status.service';
@Module({
  imports: [DataAccessModule],
  providers: [
    UsersService,
    CustomersService,
    CommentsService,
    ContactInfoService,
    ProductService,
    StatusService,
  ],
  exports: [
    UsersService,
    CustomersService,
    CommentsService,
    ContactInfoService,
    ProductService,
    StatusService,
  ],
})
export class ServicesModule {}
