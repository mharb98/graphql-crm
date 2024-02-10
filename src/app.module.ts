import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataAccessModule } from './data-access/data-access.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
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
          autoSchemaFile: true,
          playground: false,
          sortSchema: true,
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
          context: () => ({
            loaders: dataloaderService.getLoaders(),
          }),
        };
      },
      inject: [DataloaderService],
    }),
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
