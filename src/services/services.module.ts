import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { DataAccessModule } from '../data-access/data-access.module';
import { CustomersService } from './customers/customers.service';
@Module({
  imports: [DataAccessModule],
  providers: [UsersService, CustomersService],
  exports: [UsersService, CustomersService],
})
export class ServicesModule {}
