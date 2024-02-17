import { Injectable, Type } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

export function BaseRepository<T extends Type>(classRef: T): any {
  @Injectable()
  class BaseRepository {
    constructor(private readonly dataSource: DataSource) {}

    public getRepository(): Repository<typeof classRef> {
      return this.dataSource.getRepository(classRef);
    }
  }

  return BaseRepository;
}
