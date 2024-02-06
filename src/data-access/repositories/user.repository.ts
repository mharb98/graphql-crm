import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { DataSource, InsertResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

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
  ): Promise<void> {
    await this.dataSource.getRepository(UserEntity).update(
      {
        id: userId,
      },
      updateUserDto,
    );
  }
}
