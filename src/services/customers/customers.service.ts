import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CustomersRepository } from '../../data-access/repositories/customer.repository';
import { CreateCustomerDTO } from '../../graphql/resolvers/customers/types/create-customer.dto';
import { InsertResult } from 'typeorm';
import { UpdateCustomerDTO } from '../../graphql/resolvers/customers/types/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async findOne(customerId: number) {
    return await this.customersRepository.findOne(customerId);
  }

  async createCustomer(createCustomerDto: CreateCustomerDTO) {
    try {
      const result: InsertResult = await this.customersRepository.create({
        firstName: createCustomerDto.firstName,
        lastName: createCustomerDto.lastName,
      });

      return await this.customersRepository.findOne(result.identifiers[0].id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create customer');
    }
  }

  async updateCustomer(
    customerId: number,
    updateCustomerDto: UpdateCustomerDTO,
  ) {
    try {
      await this.customersRepository.update(customerId, updateCustomerDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update customer');
    }

    return await this.customersRepository.findOne(customerId);
  }

  async deleteCustomer(customerId: number) {
    try {
      await this.customersRepository.delete(customerId);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete customer');
    }
  }
}
