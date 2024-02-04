import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '../../data-access/repositories/user.repository';
import { CreateUserDTO } from '../../graphql/resolvers/users/types/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDTO) {
    try {
      return await this.usersRepository.createUser(createUserDto);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }
}
