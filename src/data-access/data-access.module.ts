import { Module } from '@nestjs/common';
import { CustomersRepository } from './repositories/customer.repository';
import { UserRepository } from './repositories/user.repository';
import { CommentsRepository } from './repositories/comment.repository';

@Module({
  imports: [],
  providers: [CustomersRepository, UserRepository, CommentsRepository],
  exports: [CustomersRepository, UserRepository, CommentsRepository],
})
export class DataAccessModule {}
