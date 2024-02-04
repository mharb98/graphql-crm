import { Module } from '@nestjs/common';
import { CustomerRepository } from './repositories/customer.repository';
import { UserRepository } from './repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [],
  providers: [CustomerRepository, UserRepository],
  exports: [CustomerRepository, UserRepository],
})
export class DataAccessModule {}
