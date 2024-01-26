import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CustomerEntity } from './customer.entity';
import { PurchaseItemEntity } from './purchase-item.entity';
import { InstallmentEntity } from './installment.entity';

@Entity({ name: 'purchases' })
export class PurchaseEntity extends BaseEntity {
  @Column({
    name: 'total_price',
    type: 'bigint',
    nullable: false,
  })
  totalPrice: number;

  @Column({
    name: 'taxes',
    type: 'bigint',
    nullable: false,
  })
  taxes: number;

  @Column({
    name: 'total_discount',
    type: 'bigint',
    nullable: false,
    default: 0,
  })
  totalDiscount: number;

  @Column({ name: 'customer_id' })
  customerId: number;

  @Column({ name: 'sales_agent_id' })
  salesAgentId: number;

  @ManyToOne(() => CustomerEntity, (customer) => customer.purchases, {
    nullable: false,
  })
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @OneToMany(() => PurchaseItemEntity, (purchaseItem) => purchaseItem.purchase)
  items: PurchaseItemEntity[];

  @OneToMany(() => InstallmentEntity, (installment) => installment.purchase)
  installments: InstallmentEntity[];
}
