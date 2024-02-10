import { Injectable } from '@nestjs/common';
import { DataSource, In } from 'typeorm';
import { ContactInfoEntity } from '../entities/contact-info.entity';

@Injectable()
export class ContactInfoRepository {
  constructor(private dataSource: DataSource) {}

  async listAll(customerIds: number[]): Promise<ContactInfoEntity[]> {
    return await this.dataSource
      .getRepository(ContactInfoEntity)
      .find({ where: { customerId: In(customerIds) } });
  }
}
