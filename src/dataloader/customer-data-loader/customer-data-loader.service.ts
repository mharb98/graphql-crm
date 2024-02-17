import { Injectable } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import * as DataLoader from 'dataloader';
import { UserEntity } from '../../data-access/entities/user.entity';
import { CustomerDataLoader } from './types/customer.data-loader';
import { CommentEntity } from '../../data-access/entities/comments.entity';
import { ContactInfoEntity } from '../../data-access/entities/contact-info.entity';
import { CommentsService } from '../../services/comments/comments.service';
import { ContactInfoService } from '../../services/contact-info/contact-info.service';

@Injectable()
export class CustomerDataLoaderService {
  constructor(
    private readonly usersService: UsersService,
    private readonly commentsService: CommentsService,
    private readonly contactInfoService: ContactInfoService,
  ) {}

  getLoaders(): CustomerDataLoader {
    const salesAgentsLoader = this.createSalesAgentsLoader();
    const commentsLoader = this.createCommentsLoader();
    const contactInfoLoader = this.createContactInfoLoader();

    return {
      salesAgentsLoader,
      commentsLoader,
      contactInfoLoader,
    };
  }

  private createSalesAgentsLoader() {
    return new DataLoader<number, UserEntity>(
      async (keys: readonly number[]) =>
        await this.usersService.getCustomersSalesAgents(keys as number[]),
    );
  }

  private createCommentsLoader() {
    return new DataLoader<number, CommentEntity[]>(
      async (keys: readonly number[]) =>
        await this.commentsService.getCustomersComments(keys as number[]),
    );
  }

  private createContactInfoLoader() {
    return new DataLoader<number, ContactInfoEntity[]>(
      async (keys: readonly number[]) =>
        await this.contactInfoService.getCustomersContactInfo(keys as number[]),
    );
  }
}
