import { Module } from '@nestjs/common';
import { CustomersRepository } from './repositories/customer.repository';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [],
  providers: [CustomersRepository, UserRepository],
  exports: [CustomersRepository, UserRepository],
})
export class DataAccessModule {}
