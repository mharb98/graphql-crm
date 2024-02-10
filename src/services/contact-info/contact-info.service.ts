import { Injectable } from '@nestjs/common';
import { ContactInfoRepository } from '../../data-access/repositories/contact-info.repository';
import { ContactInfoEntity } from '../../data-access/entities/contact-info.entity';

@Injectable()
export class ContactInfoService {
  constructor(private readonly contactInfoRepository: ContactInfoRepository) {}

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
