import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CustomerEntity } from './customer.entity';
import { UserEntity } from './user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'comments' })
export class CommentEntity extends BaseEntity {
  @Column({
    name: 'comment',
    type: 'varchar',
    nullable: false,
  })
  @Field({
    description: 'The comment that is written for a customer by a sales agent',
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
  @Field((type) => UserEntity, {
    description: 'The user that wrote the comment',
    nullable: false,
  })
  user: UserEntity;

  @ManyToOne(() => CustomerEntity, (customer) => customer.comments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customer_id' })
  @Field((type) => CustomerEntity, {
    description: 'The customer to which that comment was writte',
    nullable: false,
  })
  customer: CustomerEntity;
}
