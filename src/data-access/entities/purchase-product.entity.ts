import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PurchaseEntity } from './purchase.entity';
import { ProductEntity } from './product.entity';

@Unique('unique_constraint_purchase_id_product_id', ['productId', 'purchaseId'])
@Entity({ name: 'purchase_products' })
export class PurchaseProductEntity extends BaseEntity {
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

  @Column({ name: 'product_id' })
  productId: number;

  @Column({ name: 'purchase_id' })
  purchaseId: number;

  @ManyToOne(() => ProductEntity, (product) => product.purchases, {
    nullable: false,
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(() => PurchaseEntity, (purchase) => purchase.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'purchase_id' })
  purchase: PurchaseEntity;
}
