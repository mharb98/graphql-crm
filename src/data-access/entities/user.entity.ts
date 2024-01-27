import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CustomerEntity } from './customer.entity';
import { CommentEntity } from './comments.entity';
import { StatusUpdateEntity } from './status-update.entity';
import { Field, ObjectType } from '@nestjs/graphql';

/**
 * npx typeorm entity:create src/data-access/entities/user.entity
 */
@ObjectType()
@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ name: 'first_name', length: 255, type: 'varchar', nullable: false })
  @Field({ nullable: false, description: 'First name of the user' })
  firstName: string;

  @Column({
    name: 'middle_name',
    length: 255,
    type: 'varchar',
    nullable: true,
  })
  middleName: string;

  @Column({
    name: 'last_name',
    length: 255,
    type: 'varchar',
    nullable: false,
  })
  lastName: string;

  @Column({
    name: 'email',
    length: 255,
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @Column({
    name: 'phone_number',
    length: 255,
    type: 'varchar',
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    name: 'banned',
    type: 'boolean',
    default: false,
  })
  banned: boolean;

  @OneToMany(() => CustomerEntity, (customer) => customer.salesAgent)
  customers: CustomerEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @OneToMany(() => StatusUpdateEntity, (statusUpdate) => statusUpdate.user)
  statusUpdates: StatusUpdateEntity[];
}