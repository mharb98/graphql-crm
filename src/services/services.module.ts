import { Module } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { DataAccessModule } from '../data-access/data-access.module';

@Module({
  imports: [DataAccessModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class ServicesModule {}
