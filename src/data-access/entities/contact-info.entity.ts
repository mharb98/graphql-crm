import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CustomerEntity } from './customer.entity';

@Entity({ name: 'contact_info' })
export class ContactInfoEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false, name: 'value' })
  value: string;

  @Column({ name: 'customer_id' })
  customerId: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.contactInfo, {
    nullable: true,
  })
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;
}
