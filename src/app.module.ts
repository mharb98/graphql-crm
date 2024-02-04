import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataAccessModule } from './data-access/data-access.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { dataSourceOptions } from './ormconfig';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    GraphqlModule,
    DataAccessModule,
    ServicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
