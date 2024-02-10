import { Injectable } from '@nestjs/common';
import { DataSource, In, InsertResult } from 'typeorm';
import { ContactInfoEntity } from '../entities/contact-info.entity';

@Injectable()
export class ContactInfoRepository {
  constructor(private dataSource: DataSource) {}

  async create(customerId: number, value: string): Promise<InsertResult> {
    return await this.dataSource.getRepository(ContactInfoEntity).insert({
      customerId,
      value,
    });
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
