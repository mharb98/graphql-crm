import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PurchaseEntity } from './purchase.entity';
import { Field, Float, ObjectType } from '@nestjs/graphql';
import { DecimalTransformer } from '../transformers/decimal.transformer';

@ObjectType()
@Entity({ name: 'installments' })
export class InstallmentEntity extends BaseEntity {
  @Column({
    name: 'amount',
    type: 'decimal',
    nullable: false,
    transformer: new DecimalTransformer(),
  })
  @Field(() => Float, {
    description: 'The amount that was paid in the installment',
    nullable: true,
  })
  amount: number;

  @Column({
    name: 'due_date',
    type: 'date',
    nullable: false,
  })
  @Field(() => Date, {
    description: 'The due date for the installment payment',
    nullable: true,
  })
  dueDate: Date;

  @Column({
    name: 'paid',
    nullable: false,
    type: 'boolean',
    default: false,
  })
  paid: boolean;

  @Column({ name: 'purchase_id' })
  purchaseId: number;

  @ManyToOne(() => PurchaseEntity, (purchase) => purchase.installments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'purchase_id' })
  @Field(() => PurchaseEntity, {
    description: 'The purchase for which the installment will be paid',
    nullable: true,
  })
  purchase: PurchaseEntity;
}
