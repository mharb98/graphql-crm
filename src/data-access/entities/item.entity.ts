import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'items' })
export class ItemEntity extends BaseEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'price',
    type: 'bigint',
    nullable: false,
  })
  price: number;

  @Column({
    name: 'stock',
    type: 'bigint',
    nullable: false,
  })
  stock: number;
}
