import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserEntity } from './user.entity';
import { ContactInfoEntity } from './contact-info.entity';
import { PurchaseEntity } from './purchase.entity';
import { CommentEntity } from './comments.entity';
import { Field, ObjectType } from '@nestjs/graphql';

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

  @Column({ name: 'sales_agent_id' })
  salesAgentId: number;

  @ManyToOne(() => UserEntity, (user) => user.customers, { nullable: true })
  @JoinColumn({ name: 'sales_agent_id' })
  @Field((type) => UserEntity, {
    description: 'Sales Agent Associated with a customer',
  })
  salesAgent: UserEntity;

  @OneToMany(() => ContactInfoEntity, (contactInfo) => contactInfo.customer)
  @Field((type) => [ContactInfoEntity!], {
    description: 'The contact info entities for the customer',
  })
  contactInfo: ContactInfoEntity[];

  @OneToMany(() => PurchaseEntity, (purchase) => purchase.customer)
  purchases: PurchaseEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.customer)
  comments: CommentEntity[];
}
