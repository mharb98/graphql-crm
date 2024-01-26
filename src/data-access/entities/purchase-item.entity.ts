import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ItemEntity } from './item.entity';
import { PurchaseEntity } from './purchase.entity';

@Unique('unique_constraint_purchase_id_item_id', ['itemId', 'purchaseId'])
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

  @Column({ name: 'purchase_id' })
  purchaseId: number;

  @ManyToOne(() => ItemEntity, (item) => item.purchases, { nullable: false })
  @JoinColumn({ name: 'item_id' })
  item: ItemEntity;

  @ManyToOne(() => PurchaseEntity, (purchase) => purchase.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'purchase_id' })
  purchase: PurchaseEntity;
}
