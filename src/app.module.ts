import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataAccessModule } from './data-access/data-access.module';
import { dataSourceOptions } from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    GraphqlModule,
    DataAccessModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
