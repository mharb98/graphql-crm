import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  migrationsTableName: 'migrations',
  type: 'postgres',
  url: process.env.DATABASE_URL,
  logging: false,
  synchronize: false,
  name: 'default',
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, '**', '/migrations/*.{ts,js}')],
  subscribers: [join(__dirname, '**', '/subscribers/*.{ts,js}')],
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
