import { DataSource, EntityTarget } from 'typeorm';

export class GenericRepository<T> {
  constructor(
    private dataSource: DataSource,
    private entity: EntityTarget<T>,
  ) {}

  public getRepository() {
    return this.dataSource.getRepository(this.entity);
  }
}
