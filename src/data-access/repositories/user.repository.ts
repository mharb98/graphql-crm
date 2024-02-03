import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { BaseRepository } from './base.repository';
import { Repository, getRepository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(getRepositoryToken(UserEntity))
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async query(id: number): Promise<UserEntity[]> {
    const users: UserEntity[] = await this.userRepository.find({
      where: {
        id: 1,
      },
      relations: {},
    });

    return users;
  }
}
