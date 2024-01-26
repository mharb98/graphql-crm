import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ItemEntity } from './item.entity';
import { PurchaseEntity } from './purchase.entity';

@Entity({ name: 'purchase_items' })
export class PurchaseItemEntity extends BaseEntity {
  @Column({
    type: 'bigint',
    name: 'amount',
    nullable: false,
  })
  amount: number;

  @Column({
    type: 'bigint',
    name: 'discount',
    nullable: false,
  })
  discount: number;

  @Column({ name: 'item_id' })
  itemId: number;

  @Column({ name: 'customer_id' })
  customerId: number;

  @OneToMany(() => ItemEntity, (item) => item.purchases, { nullable: false })
  @JoinColumn({ name: 'item_id' })
  item: ItemEntity;

  @OneToMany(() => PurchaseEntity, (purchase) => purchase.items)
  @JoinColumn({ name: 'customer_id' })
  purchase: PurchaseEntity;
}
