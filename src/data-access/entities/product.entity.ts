import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PurchaseProductEntity } from './purchase-product.entity';

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, name: 'name', length: 255 })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'description',
    length: 255,
  })
  description: string;

  @Column({ type: 'bigint', nullable: false, name: 'price' })
  price: number;

  @Column({ type: 'bigint', nullable: false, name: 'stock', default: 0 })
  stock: number;

  @Column({ type: 'bigint', nullable: false, name: 'rating', default: 0 })
  rating: number;

  @OneToMany(
    () => PurchaseProductEntity,
    (purchaseItem) => purchaseItem.product,
  )
  purchases: PurchaseProductEntity[];
}
