import { Injectable } from '@nestjs/common';
import {
  DataSource,
  FindOptionsRelations,
  FindOptionsWhere,
  InsertResult,
} from 'typeorm';
import { ContactInfoEntity } from '../entities/contact-info.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class ContactInfoRepository {
  constructor(private dataSource: DataSource) {}

  async create(
    createContactInfoDto: QueryDeepPartialEntity<ContactInfoEntity>,
  ): Promise<InsertResult> {
    return await this.dataSource
      .getRepository(ContactInfoEntity)
      .insert(createContactInfoDto);
  }

  async update(
    id: number,
    updateContactInfoDto: QueryDeepPartialEntity<ContactInfoEntity>,
  ): Promise<void> {
    await this.dataSource
      .getRepository(ContactInfoEntity)
      .update({ id }, updateContactInfoDto);
  }

  async findOne(id: number): Promise<ContactInfoEntity> {
    return await this.dataSource
      .getRepository(ContactInfoEntity)
      .findOneByOrFail({ id });
  }

  async deleteOne(id: number): Promise<void> {
    await this.dataSource.getTreeRepository(ContactInfoEntity).delete(id);
  }

  async listAll(
    listAllInput: FindOptionsWhere<ContactInfoEntity>,
    findOptionsRelations: FindOptionsRelations<ContactInfoEntity>,
  ): Promise<ContactInfoEntity[]> {
    return await this.dataSource.getRepository(ContactInfoEntity).find({
      where: listAllInput,
      relations: findOptionsRelations,
    });
  }
}
