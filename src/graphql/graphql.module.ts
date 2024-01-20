import { Module } from '@nestjs/common';
import { UserResolver } from './users/users.resolver';
import { CustomerResolver } from './customers/customer.resolver';
import { ContactInfoResolver } from './contact-info/contact-info.resolver';

@Module({
  imports: [],
  exports: [UserResolver, CustomerResolver, ContactInfoResolver],
  providers: [UserResolver, CustomerResolver, ContactInfoResolver],
})
export class GraphqlModule {}
