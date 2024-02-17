import DataLoader from 'dataloader';
import { UserEntity } from '../../../data-access/entities/user.entity';
import { ContactInfoEntity } from '../../../data-access/entities/contact-info.entity';
import { CommentEntity } from '../../../data-access/entities/comments.entity';

export interface CustomerDataLoader {
  salesAgentsLoader: DataLoader<number, UserEntity>;
  contactInfoLoader: DataLoader<number, ContactInfoEntity[]>;
  commentsLoader: DataLoader<number, CommentEntity[]>;
}
