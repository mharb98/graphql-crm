import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '../../data-access/repositories/user.repository';
import { CreateUserDTO } from '../../graphql/resolvers/users/types/create-user.dto';
import { UpdateUserDTO } from '../../graphql/resolvers/users/types/update-user.dto';
import { InsertResult } from 'typeorm';
import { UserEntity } from '../../data-access/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

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
}
