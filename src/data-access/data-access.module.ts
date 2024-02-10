import { Module } from '@nestjs/common';
import { CustomersRepository } from './repositories/customer.repository';
import { UserRepository } from './repositories/user.repository';
import { CommentsRepository } from './repositories/comment.repository';
import { ContactInfoRepository } from './repositories/contact-info.repository';
import { ContactInfoEntity } from './entities/contact-info.entity';

@Module({
  imports: [],
  providers: [
    CustomersRepository,
    UserRepository,
    CommentsRepository,
    ContactInfoRepository,
  ],
  exports: [
    CustomersRepository,
    UserRepository,
    CommentsRepository,
    ContactInfoRepository,
  ],
})
export class DataAccessModule {}
