import { Inject, Type } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export function BaseRepository<T extends Type<unknown>>(classRef: T): any {
  abstract class BaseRepository {
    constructor(
      @Inject(getRepositoryToken(classRef))
      private readonly repository: Repository<T>,
    ) {}

    getRepository(): Repository<T> {
      return this.repository;
    }
  }

  return BaseRepository;
}
