import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CustomerEntity } from './customer.entity';
import { PurchaseProductEntity } from './purchase-product.entity';
import { InstallmentEntity } from './installment.entity';
import { Field, Float, ObjectType } from '@nestjs/graphql';
import { DecimalTransformer } from '../transformers/decimal.transformer';

@ObjectType()
@Entity({ name: 'purchases' })
export class PurchaseEntity extends BaseEntity {
  @Column({
    name: 'total_price',
    type: 'decimal',
    nullable: false,
    transformer: new DecimalTransformer(),
  })
  @Field(() => Float, {
    description: 'The total Price of items in the purchase',
    nullable: false,
  })
  totalPrice: number;

  @Column({
    name: 'taxes',
    type: 'decimal',
    nullable: false,
    transformer: new DecimalTransformer(),
  })
  @Field(() => Float, {
    description: 'The amount of taxes added to the purchase',
    nullable: false,
  })
  taxes: number;

  @Column({
    name: 'total_discount',
    type: 'decimal',
    nullable: false,
    default: 0,
    transformer: new DecimalTransformer(),
  })
  @Field(() => Float, {
    description: 'The amount of discount on the items',
    nullable: false,
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
  @Field(() => [PurchaseProductEntity], {
    description: 'The products that were bought in the purchase',
  })
  products: PurchaseProductEntity[];

  @OneToMany(() => InstallmentEntity, (installment) => installment.purchase)
  @Field(() => [InstallmentEntity], {
    description: 'The installments paid for the purchase',
  })
  installments: InstallmentEntity[];
}
