import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '../../data-access/repositories/user.repository';
import { CreateUserDTO } from '../../graphql/resolvers/users/types/create-user.dto';
import { UpdateUserDTO } from '../../graphql/resolvers/users/types/update-user.dto';
import { InsertResult } from 'typeorm';
import { UserEntity } from '../../data-access/entities/user.entity';
import { CustomerEntity } from '../../data-access/entities/customer.entity';
import { CustomersRepository } from '../../data-access/repositories/customer.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly customerRepository: CustomersRepository,
  ) {}

  async createUser(createUserDto: CreateUserDTO) {
    try {
      const result: InsertResult = await this.usersRepository.createUser(
        createUserDto,
      );

      return await this.usersRepository.findOne(result.identifiers[0].id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDTO) {
    try {
      await this.usersRepository.updateUser(userId, updateUserDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async enableUser(userId: number): Promise<UserEntity> {
    await this.usersRepository.updateUser(userId, { banned: false });

    return await this.usersRepository.findOne(userId);
  }

  async disableUser(userId: number): Promise<UserEntity> {
    await this.usersRepository.updateUser(userId, { banned: true });

    return await this.usersRepository.findOne(userId);
  }

  async findOne(userId: number): Promise<UserEntity> {
    return await this.usersRepository.findOne(userId);
  }

  async getCustomersSalesAgents(customerIds: number[]): Promise<any> {
    const customers: CustomerEntity[] = await this.customerRepository.listAll(
      customerIds,
    );

    const mappedResults = this.mapUsersToCustomerIds(customerIds, customers);

    return mappedResults;
  }

  private mapUsersToCustomerIds = (
    customerIds: number[],
    customers: CustomerEntity[],
  ): any => {
    return customerIds.map((id) => {
      return customers.find((customer) => customer.id === id).salesAgent;
    });
    // const hash: any = {};

    // return customerIds.map((id) => {
    //   return users.filter((user) => {
    //     if(user.customers.)
    //   })
    // });
  };
}
