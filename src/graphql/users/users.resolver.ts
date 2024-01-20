import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { User } from './types/user.model';

@Resolver((of) => User)
export class UserResolver {
  constructor() {}

  @Query((returns) => User, {
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

  @Query((type) => [User], { name: 'QueryUsers' })
  async queryUsers(): Promise<User[]> {
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
}
