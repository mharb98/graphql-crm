import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CustomersRepository } from '../../data-access/repositories/customer.repository';
import { CreateCustomerDTO } from '../../graphql/resolvers/customers/types/create-customer.dto';
import { In, InsertResult } from 'typeorm';
import { UpdateCustomerDTO } from '../../graphql/resolvers/customers/types/update-customer.dto';
import { CustomerEntity } from '../../data-access/entities/customer.entity';
import { ContactInfoEntity } from '../../data-access/entities/contact-info.entity';
import { ContactInfoRepository } from '../../data-access/repositories/contact-info.repository';
import { PurchaseRepository } from '../../data-access/repositories/purchase.repository';
import { PurchaseEntity } from '../../data-access/entities/purchase.entity';

@Injectable()
export class CustomersService {
  constructor(
    private readonly customersRepository: CustomersRepository,
    private readonly contactInfoRepository: ContactInfoRepository,
    private readonly purchaseRepository: PurchaseRepository,
  ) {}

  async queryCustomers(): Promise<CustomerEntity[]> {
    return await this.customersRepository.query();
  }

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

  async getContactInfoCustomers(contactInfoIds: number[]): Promise<any> {
    const contactInfo: ContactInfoEntity[] =
      await this.contactInfoRepository.listAll(
        { id: In(contactInfoIds) },
        {
          customer: true,
        },
      );

    return contactInfoIds.map((id) => {
      return contactInfo.find((info) => info.id === id).customer || null;
    });
  }

  async getPurchaseCustomers(purchaseIds: number[]): Promise<any> {
    const purchases: PurchaseEntity[] = await this.purchaseRepository.listAll(
      {
        ids: purchaseIds,
      },
      {
        customer: true,
      },
    );

    return purchaseIds.map((purchaseId) => {
      return (
        purchases.find((purchase) => purchase.id === purchaseId).customer ||
        null
      );
    });
  }
}
