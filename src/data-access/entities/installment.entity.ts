import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { PurchaseEntity } from './purchase.entity';

@Entity({ name: 'installments' })
export class InstallmentEntity extends BaseEntity {
  @Column({
    name: 'amount',
    type: 'bigint',
    nullable: false,
  })
  amount: number;

  @Column({
    name: 'due_date',
    type: 'date',
  })
  dueDate: Date;

  @Column({ name: 'purchase_id' })
  purchaseId: number;

  @ManyToOne(() => PurchaseEntity, (purchase) => purchase.installments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'purchase_id' })
  purchase: PurchaseEntity;
}
