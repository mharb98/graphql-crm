import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CustomerEntity } from './customer.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'contact_info' })
export class ContactInfoEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false, name: 'value' })
  @Field({ description: 'Contact info value to be used for calling' })
  value: string;

  @Column({ name: 'customer_id' })
  customerId: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.contactInfo, {
    nullable: true,
  })
  @JoinColumn({ name: 'customer_id' })
  @Field((type) => CustomerEntity, {
    description: 'The customer that owns the contact info',
  })
  customer: CustomerEntity;
}
