import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CustomerEntity } from './customer.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'comments' })
export class CommentEntity extends BaseEntity {
  @Column({
    name: 'comment',
    type: 'varchar',
    nullable: false,
  })
  comment: string;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'customer_id' })
  customerId: number;

  @ManyToOne(() => UserEntity, (user) => user.comments, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => CustomerEntity, (customer) => customer.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;
}
