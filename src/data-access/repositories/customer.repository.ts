import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, In, InsertResult, UpdateResult } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class CustomersRepository {
  constructor(private dataSource: DataSource) {}

  async findOne(id: number): Promise<CustomerEntity> {
    const customer = await this.dataSource
      .getRepository(CustomerEntity)
      .findOneBy({ id });

    if (!customer) {
      throw new BadRequestException('Customer does not exist');
    }

    return customer;
  }

  async create(
    createCustomerInput: QueryDeepPartialEntity<CustomerEntity>,
  ): Promise<InsertResult> {
    return await this.dataSource
      .getRepository(CustomerEntity)
      .insert(createCustomerInput);
  }

  async update(
    id: number,
    updateCustomerInput: QueryDeepPartialEntity<CustomerEntity>,
  ): Promise<UpdateResult> {
    return await this.dataSource
      .getRepository(CustomerEntity)
      .update({ id }, updateCustomerInput);
  }

  async delete(id: number): Promise<void> {
    await this.dataSource.getRepository(CustomerEntity).delete({ id });
  }

  async listAll(ids: number[]): Promise<CustomerEntity[]> {
    return await this.dataSource
      .getRepository(CustomerEntity)
      .find({ where: { id: In(ids) }, relations: { salesAgent: true } });
  }
}
