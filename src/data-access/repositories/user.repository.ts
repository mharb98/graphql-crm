import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDTO } from '../../graphql/resolvers/users/types/create-user.dto';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }
  // async query(id: number): Promise<UserEntity[]> {
  //   const users: UserEntity[] = await this.getRepository().find({
  //     where: {
  //       firstName: 'Maro',
  //     },
  //   });

  //   return users;
  // }

  // async update() {
  //   await this.getRepository().update(
  //     {},
  //     {
  //       firstName: 'Hambola',
  //     },
  //   );
  // }

  async createUser(createUserDto: CreateUserDTO) {
    await this.insert(createUserDto);
  }
}
