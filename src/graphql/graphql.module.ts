import { Module } from '@nestjs/common';
import { UserResolver } from './users/users.resolver';
import { CustomerResolver } from './customers/customer.resolver';
import { ContactInfoResolver } from './contact-info/contact-info.resolver';
import { CommentsResolver } from './comments/comments.resolver';
import { PurchaseResolver } from './purchase/purchase.resolver';
import { StatusResolver } from './status/status.resolver';
import { StatusUpdateResolver } from './status-update/status-update.resolver';
import { PurchaseProductResolver } from './purchase-product/purchase-product.resolver';
import { ProductResolver } from './products/product.resolver';

@Module({
  imports: [],
  exports: [],
  providers: [
    UserResolver,
    CustomerResolver,
    CommentsResolver,
    PurchaseResolver,
    ContactInfoResolver,
    StatusResolver,
    StatusUpdateResolver,
    PurchaseProductResolver,
    ProductResolver,
  ],
})
export class GraphqlModule {}
