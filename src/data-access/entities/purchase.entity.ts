import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CustomerEntity } from './customer.entity';
import { PurchaseProductEntity } from './purchase-product.entity';
import { InstallmentEntity } from './installment.entity';
import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'purchases' })
export class PurchaseEntity extends BaseEntity {
  @Column({
    name: 'total_price',
    type: 'bigint',
    nullable: false,
  })
  @Field(() => Float, {
    description: 'The total Price of items in the purchase',
  })
  totalPrice: number;

  @Column({
    name: 'taxes',
    type: 'bigint',
    nullable: false,
  })
  @Field(() => Float, {
    description: 'The amount of taxes added to the purchase',
  })
  taxes: number;

  @Column({
    name: 'total_discount',
    type: 'bigint',
    nullable: false,
    default: 0,
  })
  @Field(() => Float, {
    description: 'The amount of discount on the items',
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
  @Field(() => CustomerEntity, {
    description: 'The customer that completed the purchase',
  })
  customer: CustomerEntity;

  @OneToMany(
    () => PurchaseProductEntity,
    (purchaseItem) => purchaseItem.purchase,
  )
  products: PurchaseProductEntity[];

  @OneToMany(() => InstallmentEntity, (installment) => installment.purchase)
  installments: InstallmentEntity[];
}
