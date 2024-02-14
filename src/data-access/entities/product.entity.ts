import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PurchaseProductEntity } from './purchase-product.entity';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { DecimalTransformer } from '../transformers/decimal.transformer';

@ObjectType()
@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, name: 'name', length: 255 })
  @Field({ description: 'The name of the product', nullable: false })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'description',
    length: 255,
  })
  @Field({ description: 'The description of the product', nullable: false })
  description: string;

  @Column({
    type: 'decimal',
    nullable: false,
    name: 'price',
    transformer: new DecimalTransformer(),
  })
  @Field(() => Float, {
    description: 'The price of the product',
    nullable: false,
  })
  price: number;

  @Column({
    type: 'int',
    nullable: false,
    name: 'stock',
    default: 0,
  })
  @Field(() => Int, {
    description: 'The amount that is still available in the product',
    nullable: false,
  })
  stock: number;

  @Column({
    type: 'decimal',
    nullable: false,
    name: 'rating',
    default: 0,
    transformer: new DecimalTransformer(),
  })
  @Field(() => Float, { description: 'The total rating of the product' })
  rating: number;

  @OneToMany(
    () => PurchaseProductEntity,
    (purchaseItem) => purchaseItem.product,
  )
  @Field(() => [PurchaseProductEntity], {
    description: 'The purchases where the product was bought',
    nullable: true,
  })
  purchases: PurchaseProductEntity[];
}
