import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CustomersRepository } from '../../data-access/repositories/customer.repository';
import { CreateCustomerDTO } from '../../graphql/resolvers/customers/types/create-customer.dto';
import { InsertResult } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async createCustomer(createCustomerDto: CreateCustomerDTO) {
    try {
      const result: InsertResult = await this.customersRepository.create({
        firstName: createCustomerDto.firstName,
        lastName: createCustomerDto.lastName,
      });

      return await this.customersRepository.findOne(result.identifiers[0].id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to create customer');
    }
  }
}
