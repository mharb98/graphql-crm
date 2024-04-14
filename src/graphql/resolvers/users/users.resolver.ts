import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateUserDTO } from './types/create-user.dto';
import { UpdateUserDTO } from './types/update-user.dto';
import { UserEntity } from '../../../data-access/entities/user.entity';
import { BaseResolver } from '../base.resolver';
import { UsersService } from '../../../services/users/users.service';

@Resolver(() => UserEntity)
export class UserResolver extends BaseResolver(UserEntity) {
  constructor(private readonly userService: UsersService) {
    super();
  }

  @Query(() => UserEntity, {
    name: 'user',
    description: 'Returns the user with the specified id in the query',
  })
  async getUser(
    @Args('id', {
      type: () => Int,
      description: 'ID of the user needed to be returned',
    })
    id: number,
  ) {
    return await this.userService.findOne(id);
  }

  
  @Mutation(() => UserEntity, { description: 'Creates a user record' })
  async createUser(@Args('createUserDTO') createUserDto: CreateUserDTO) {
    return await this.userService.createUser(createUserDto);
  }

  @Mutation(() => UserEntity, {
    description: 'Updates an existing user record',
  })
  async updateUser(
    @Args('id', {
      type: () => Int,
      description: 'ID of the user record being updated',
    })
    id: number,
    @Args('updateUserDto') updateUserDto: UpdateUserDTO,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Mutation(() => UserEntity, {
    description: 'Disable a user from accessing the CRM',
  })
  async disableUser(
    @Args('id', {
      type: () => Int,
      description: 'ID of the user being disabled',
    })
    id: number,
  ) {
    return await this.userService.disableUser(id);
  }

  @Mutation(() => UserEntity, {
    description: 'Enable a user to access the CRM',
  })
  async enableUser(
    @Args('id', {
      type: () => Int,
      description: 'ID of the user being enabled',
    })
    id: number,
  ) {
    return await this.userService.enableUser(id);
  }

  @Mutation(() => UserEntity, { description: 'Delete a user from CRM' })
  async deleteUser(
    @Args('id', { type: () => Int, description: 'ID of user being deleted' })
    id: number,
  ) {
    return await this.userService.deleteUser(id);
  }

  @ResolveField()
  async customers() {
    return [
      {
        id: 1,
        firstName: 'Marwan',
        lastName: 'Salah',
      },
      {
        id: 2,
        firstName: 'Yasseen',
        lastName: 'Salah',
      },
      {
        id: 3,
        firstName: 'Zeyad',
        lastName: 'Salah',
      },
    ];
  }
}
