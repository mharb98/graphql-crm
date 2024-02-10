import { Injectable } from '@nestjs/common';
import { DataSource, In, InsertResult } from 'typeorm';
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

  async findOne(customerId: number): Promise<ContactInfoEntity> {
    return await this.dataSource
      .getRepository(ContactInfoEntity)
      .findOneByOrFail({ id: customerId });
  }

  async listAll(customerIds: number[]): Promise<ContactInfoEntity[]> {
    return await this.dataSource
      .getRepository(ContactInfoEntity)
      .find({ where: { customerId: In(customerIds) } });
  }
}
