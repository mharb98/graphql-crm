import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '11071964',
  database: 'graphql_crm',
  logging: false,
  synchronize: false,
  name: 'default',
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '**', '/migrations/*.{ts,js}')],
  subscribers: [join(__dirname, '**', '*.entity.{ts,js}')],
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
