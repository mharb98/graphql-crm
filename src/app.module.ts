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
import { IDataloaders } from './dataloader/dataloader.interface';
import { ConfigModule } from '@nestjs/config';

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
          context: () => {
            const loaders: IDataloaders = dataloaderService.getLoaders();

            return {
              ...loaders,
            };
          },
        };
      },
      inject: [DataloaderService],
    }),
    ConfigModule.forRoot(),
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
