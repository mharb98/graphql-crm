import { Args, Int, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ContactInfo } from './types/contact-info.model';

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
