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
  @Field({ description: 'Middle name of the user', nullable: true })
  middleName: string;

  @Column({
    name: 'last_name',
    length: 255,
    type: 'varchar',
    nullable: false,
  })
  @Field({ nullable: false, description: 'Last name of the user' })
  lastName: string;

  @Column({
    name: 'email',
    length: 255,
    type: 'varchar',
    nullable: false,
  })
  @Field({ nullable: false, description: 'User Email' })
  email: string;

  @Column({
    name: 'phone_number',
    length: 255,
    type: 'varchar',
    nullable: true,
  })
  @Field({ nullable: true, description: 'User phone number' })
  phoneNumber: string;

  @Column({
    name: 'banned',
    type: 'boolean',
    default: false,
  })
  @Field({ nullable: false, description: 'User status Disabled/Enabled' })
  banned: boolean;

  @OneToMany(() => CustomerEntity, (customer) => customer.salesAgent)
  @Field(() => [CustomerEntity], {
    description: 'A set of customers being managed by the user',
  })
  customers: CustomerEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  @Field(() => [CommentEntity], {
    description: 'The comments that are added to a specific customer by a user',
  })
  comments: CommentEntity[];

  @OneToMany(() => StatusUpdateEntity, (statusUpdate) => statusUpdate.user)
  @Field(() => [StatusUpdateEntity], {
    description: 'The status updates that are applied on a customer by a user',
  })
  statusUpdates: StatusUpdateEntity[];
}
