import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { DataSource, In, InsertResult, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ListAllUsersInput } from './query-input-types/list-all-users-input.type';

@Injectable()
export class UserRepository {
  constructor(private dataSource: DataSource) {}

  async findOne(userId: number): Promise<UserEntity> {
    const user = await this.dataSource
      .getRepository(UserEntity)
      .findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException("User Doesn't exist");
    }

    return user;
  }

  async createUser(
    createUserDto: QueryDeepPartialEntity<UserEntity>,
  ): Promise<InsertResult> {
    return await this.dataSource
      .getRepository(UserEntity)
      .insert(createUserDto);
  }

  async updateUser(
    userId: number,
    updateUserDto: QueryDeepPartialEntity<UserEntity>,
  ): Promise<UpdateResult> {
    return await this.dataSource.getRepository(UserEntity).update(
      {
        id: userId,
      },
      updateUserDto,
    );
  }

  async query(ids: number[]): Promise<UserEntity[]> {
    return await this.dataSource
      .getRepository(UserEntity)
      .find({ where: { id: In(ids) } });
  }

  async getCustomerSalesAgents(customerIds: number[]): Promise<UserEntity[]> {
    return await this.dataSource.getRepository(UserEntity).find({
      where: {
        customers: {
          id: In(customerIds),
        },
      },
      relations: {
        customers: true,
      },
    });
  }

  async deleteUser(id: number): Promise<void> {
    await this.dataSource.getRepository(UserEntity).delete({ id });
  }
}
