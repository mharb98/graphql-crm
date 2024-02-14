import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PurchaseEntity } from './purchase.entity';
import { ProductEntity } from './product.entity';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Unique('unique_constraint_purchase_id_product_id', ['productId', 'purchaseId'])
@Entity({ name: 'purchase_products' })
export class PurchaseProductEntity extends BaseEntity {
  @Column({
    name: 'amount',
    nullable: false,
  })
  @Field(() => Int, {
    description:
      'The amount that was taken for the product in a specific purchase',
    nullable: false,
  })
  amount: number;

  @Column({
    name: 'discount',
    nullable: false,
  })
  @Field(() => Float, {
    description: 'The discount that was appleid on the product',
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
  @Field(() => ProductEntity, {
    description: 'The product that is bought',
  })
  product: ProductEntity;

  @ManyToOne(() => PurchaseEntity, (purchase) => purchase.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'purchase_id' })
  @Field(() => PurchaseEntity, {
    description: 'The purchase to which the product belongs',
  })
  purchase: PurchaseEntity;
}
