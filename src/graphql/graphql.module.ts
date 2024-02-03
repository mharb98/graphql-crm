import { Module } from '@nestjs/common';
import { UserResolver } from './resolvers/users/users.resolver';
import { CustomerResolver } from './resolvers/customers/customer.resolver';
import { ContactInfoResolver } from './resolvers/contact-info/contact-info.resolver';
import { CommentsResolver } from './resolvers/comments/comments.resolver';
import { PurchaseResolver } from './resolvers/purchase/purchase.resolver';
import { StatusResolver } from './resolvers/status/status.resolver';
import { StatusUpdateResolver } from './resolvers/status-update/status-update.resolver';
import { PurchaseProductResolver } from './resolvers/purchase-product/purchase-product.resolver';
import { ProductResolver } from './resolvers/products/product.resolver';
import { InstallmentsResolver } from './resolvers/installments/installments.resolver';

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
    InstallmentsResolver,
  ],
})
export class GraphqlModule {}
