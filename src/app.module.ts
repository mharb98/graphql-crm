import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataAccessModule } from './data-access/data-access.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { dataSourceOptions } from './ormconfig';
import { ServicesModule } from './services/services.module';
import { DataloaderModule } from './dataloader/dataloader.module';
import { DataloaderService } from './dataloader/dataloader.service';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataloaderModule],
      useFactory: (dataloaderService: DataloaderService) => {
        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          playground: false,
          sortSchema: true,
          context: () => ({
            loaders: dataloaderService.getLoaders(),
          }),
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
        };
      },
      inject: [DataloaderService],
    }),
    // GraphQLModule.forRoot({
    //   driver: ApolloDriver,
    //   playground: false,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   sortSchema: true,
    //   plugins: [ApolloServerPluginLandingPageLocalDefault()],
    // }),
    TypeOrmModule.forRoot(dataSourceOptions),
    GraphqlModule,
    DataAccessModule,
    ServicesModule,
    DataloaderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
