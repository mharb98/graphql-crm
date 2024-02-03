import { Module } from '@nestjs/common';
import { UserResolver } from './users/users.resolver';
import { CustomerResolver } from './customers/customer.resolver';
import { ContactInfoResolver } from './contact-info/contact-info.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ProductResolver } from './products/product.resolver';
import { CommentsResolver } from './comments/comments.resolver';

@Module({
  imports: [],
  exports: [
    // ProductResolver,
    // UserResolver,
    // CustomerResolver,
    // ContactInfoResolver,
  ],
  providers: [
    UserResolver,
    CustomerResolver,
    CommentsResolver,
    // ProductResolver,
    // UserResolver,
    // CustomerResolver,
    // ContactInfoResolver,
  ],
})
export class GraphqlModule {}
