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
import { UserEntity } from '../../data-access/entities/user.entity';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor() {}

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
    return {
      id: id,
      firstName: 'Marwan',
      middleName: 'Salah',
      lastName: 'Harb',
      email: 'marwanharb65@outlook.com',
      phoneNumber: '+201013747167',
      banned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @Query(() => [UserEntity], {
    name: 'QueryUsers',
    description: 'Query users model and returns a paginated users result',
  })
  async queryUsers() {
    return [
      {
        id: 1,
        firstName: 'Marwan',
        middleName: 'Salah',
        lastName: 'Harb',
        email: 'marwanharb65@outlook.com',
        phoneNumber: '+201013747167',
        banned: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        firstName: 'Mohamed',
        middleName: 'Ahmed',
        lastName: 'Mahmoud',
        email: 'mohamed.ahmed@outlook.com',
        phoneNumber: '+201004611977',
        banned: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }

  @Mutation(() => UserEntity, { description: 'Creates a user record' })
  async createUser(@Args('createUserDTO') createUserDto: CreateUserDTO) {
    console.log(createUserDto);

    return {
      id: 1,
      firstName: 'Marwan',
      middleName: 'Salah',
      lastName: 'Harb',
      email: 'marwanharb65@outlook.com',
      phoneNumber: '+201013747167',
      banned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
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
    console.log(id);
    console.log(updateUserDto);

    return {
      id: 1,
      firstName: 'Marwan',
      middleName: 'Salah',
      lastName: 'Harb',
      email: 'marwanharb65@outlook.com',
      phoneNumber: '+201013747167',
      banned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
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
    console.log(id);

    return {
      id: 1,
      firstName: 'Marwan',
      middleName: 'Salah',
      lastName: 'Harb',
      email: 'marwanharb65@outlook.com',
      phoneNumber: '+201013747167',
      banned: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @Mutation((type) => UserEntity, {
    description: 'Enable a user to access the CRM',
  })
  async enableUser(
    @Args('id', {
      type: () => Int,
      description: 'ID of the user being enabled',
    })
    id: number,
  ) {
    console.log(id);

    return {
      id: 1,
      firstName: 'Marwan',
      middleName: 'Salah',
      lastName: 'Harb',
      email: 'marwanharb65@outlook.com',
      phoneNumber: '+201013747167',
      banned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @Mutation(() => UserEntity, { description: 'Delete a user from CRM' })
  async deleteUser(
    @Args('id', { type: () => Int, description: 'ID of user being deleted' })
    id: number,
  ) {
    console.log(id);

    return {
      id: 1,
      firstName: 'Marwan',
      middleName: 'Salah',
      lastName: 'Harb',
      email: 'marwanharb65@outlook.com',
      phoneNumber: '+201013747167',
      banned: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
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

  @ResolveField()
  async comments() {
    return [
      {
        comment: 'Comment 1',
      },
      {
        comment: 'Comment 2',
      },
    ];
  }

  @ResolveField()
  async statusUpdates() {
    return [
      {
        comment: 'Status Update 1',
      },
      {
        comment: 'Status Update 2',
      },
    ];
  }
}
