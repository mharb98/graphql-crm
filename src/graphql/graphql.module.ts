import { Module } from '@nestjs/common';
import { UserResolver } from './users/users.resolver';

@Module({
  imports: [],
  exports: [UserResolver],
  providers: [UserResolver],
})
export class GraphqlModule {}
