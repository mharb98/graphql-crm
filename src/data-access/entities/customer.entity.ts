import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { ContactInfoEntity } from './contact-info.entity';
import { PurchaseEntity } from './purchase.entity';
import { CommentEntity } from './comments.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { StatusUpdateEntity } from './status-update.entity';

@ObjectType()
@Entity({ name: 'customers' })
export class CustomerEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    name: 'first_name',
    length: 255,
    nullable: false,
  })
  @Field({ description: 'First name of the customer', nullable: false })
  firstName: string;

  @Column({
    type: 'varchar',
    name: 'last_name',
    length: 255,
    nullable: false,
  })
  @Field({ description: 'Last name of the customer', nullable: false })
  lastName: string;

  @Column({ name: 'sales_agent_id', nullable: true })
  salesAgentId?: number;

  @ManyToOne(() => UserEntity, (user) => user.customers, { nullable: true })
  @JoinColumn({ name: 'sales_agent_id' })
  @Field(() => UserEntity, {
    description: 'Sales Agent Associated with a customer',
  })
  salesAgent?: UserEntity;

  @OneToMany(() => ContactInfoEntity, (contactInfo) => contactInfo.customer)
  @Field(() => [ContactInfoEntity], {
    description: 'The contact info entities for the customer',
  })
  contactInfo?: ContactInfoEntity[];

  @OneToMany(() => PurchaseEntity, (purchase) => purchase.customer)
  @Field(() => [PurchaseEntity], {
    description: 'The set of purchases completed by a customer',
  })
  purchases?: PurchaseEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.customer)
  @Field(() => [CommentEntity], {
    description:
      'The comments written by users to track activity for the customer',
  })
  comments?: CommentEntity[];

  @OneToMany(() => StatusUpdateEntity, (statusUpdate) => statusUpdate.customer)
  @Field(() => [StatusUpdateEntity], {
    description:
      'The status updates that are applied on the customer by a user',
  })
  statusUpdates: StatusUpdateEntity[];
}
