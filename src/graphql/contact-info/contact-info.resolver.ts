import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ContactInfo } from './types/contact-info.model';
import { CreateContactInfoDTO } from './types/create-contact-info.dto';
import { UpdateContactInfoDTO } from './types/update-contact-info.dto';

@Resolver((of) => ContactInfo)
export class ContactInfoResolver {
  @Query((returns) => ContactInfo, {
    name: 'contactInfo',
    description: 'Returns a contact info specified by an ID',
  })
  async getContactInfo(
    @Args('id', {
      type: () => Int,
      description: 'ID of the needed contact info to be returned',
    })
    id: number,
  ) {
    return {
      id,
      type: 'email',
      value: 'example@exampledomain.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @Mutation((returns) => ContactInfo, {
    description: 'Add new contact info for a customer',
  })
  async createContactInfo(
    @Args('customerId', {
      type: () => Int,
      description: 'ID of customer with the contact info',
    })
    customerId: number,
    @Args('createContactInfoDto') createContactInfoDto: CreateContactInfoDTO,
  ) {
    console.log(customerId);
    console.log(createContactInfoDto);

    return {
      id: 1,
      type: 'email',
      value: 'example@exampledomain.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @Mutation((returns) => ContactInfo, {
    description: 'Update existing customer contact info',
  })
  async updateContactInfo(
    @Args('id', {
      type: () => Int,
      description: 'ID of contact info to be deleted',
    })
    id: number,
    @Args('updateContactInfoDto') updateContactInfoDto: UpdateContactInfoDTO,
  ) {
    console.log(id);
    console.log(updateContactInfoDto);

    return {
      id,
      type: 'email',
      value: 'example@exampledomain.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @Mutation((returns) => ContactInfo, {
    description: 'Deletes an existing contact info',
  })
  async deleteContactInfo(
    @Args('id', {
      type: () => Int,
      description: 'ID of contact info to be deleted',
    })
    id: number,
  ) {
    console.log(id);

    return {
      id,
      type: 'email',
      value: 'example@exampledomain.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @ResolveField()
  async customer() {
    return {
      id: 1,
      firstName: 'Marwan',
      lastName: 'Salah',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}