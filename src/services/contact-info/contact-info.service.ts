import { Injectable } from '@nestjs/common';
import { ContactInfoRepository } from '../../data-access/repositories/contact-info.repository';
import { ContactInfoEntity } from '../../data-access/entities/contact-info.entity';
import { InsertResult } from 'typeorm';

@Injectable()
export class ContactInfoService {
  constructor(private readonly contactInfoRepository: ContactInfoRepository) {}

  async createCustomerContactInfo(
    customerId: number,
    value: string,
  ): Promise<ContactInfoEntity> {
    const contactInfo: InsertResult = await this.contactInfoRepository.create(
      customerId,
      value,
    );

    return await this.contactInfoRepository.findOne(
      contactInfo.identifiers[0].id,
    );
  }

  async getCustomersContactInfo(customerIds: number[]): Promise<any> {
    const contactInfo: ContactInfoEntity[] =
      await this.contactInfoRepository.listAll(customerIds);

    return customerIds.map((id) => {
      return (
        contactInfo.filter((info) => {
          return info.customerId === id;
        }) || null
      );
    });
  }
}
