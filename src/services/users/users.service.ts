import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '../../data-access/repositories/user.repository';
import { CreateUserDTO } from '../../graphql/resolvers/users/types/create-user.dto';
import { UpdateUserDTO } from '../../graphql/resolvers/users/types/update-user.dto';
import { InsertResult } from 'typeorm';
import { UserEntity } from '../../data-access/entities/user.entity';
import { CustomerEntity } from '../../data-access/entities/customer.entity';
import { CustomersRepository } from '../../data-access/repositories/customer.repository';
import { PurchaseEntity } from '../../data-access/entities/purchase.entity';
import { PurchaseRepository } from '../../data-access/repositories/purchase.repository';
import { CommentEntity } from '../../data-access/entities/comments.entity';
import { CommentsRepository } from '../../data-access/repositories/comment.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly customerRepository: CustomersRepository,
    private readonly purchaseRepository: PurchaseRepository,
    private readonly commentsRepository: CommentsRepository,
  ) {}

  async createUser(createUserDto: CreateUserDTO) {
    const result: InsertResult = await this.usersRepository.createUser(
      createUserDto,
    );

    return await this.usersRepository.findOne(result.identifiers[0].id);
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
      {
        ids: customerIds,
      },
      {
        salesAgent: true,
      },
    );

    const mappedResults = this.mapUsersToCustomerIds(customerIds, customers);

    return mappedResults;
  }

  async getPurchaseSalesAgents(purchaseIds: number[]): Promise<any> {
    const purchases: PurchaseEntity[] = await this.purchaseRepository.listAll(
      { ids: purchaseIds },
      { salesAgent: true },
    );

    return purchaseIds.map(
      (id) =>
        purchases.find((purchase) => purchase.id === id).salesAgent || null,
    );
  }

  async getCommentsUsers(commentIds: number[]): Promise<any> {
    const comments: CommentEntity[] = await this.commentsRepository.listAll(
      {
        ids: commentIds,
      },
      { user: true },
    );

    return commentIds.map((id) => {
      return comments.find((comment) => comment.id === id).user || null;
    });
  }

  private mapUsersToCustomerIds = (
    customerIds: number[],
    customers: CustomerEntity[],
  ): any => {
    return customerIds.map((id) => {
      return (
        customers.find((customer) => customer.id === id).salesAgent || null
      );
    });
  };
}
