import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CustomerEntity } from './customer.entity';

/**
 * npx typeorm entity:create src/data-access/entities/user.entity
 */
@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ name: 'first_name', length: 255, type: 'varchar', nullable: false })
  firstName: string;

  @Column({
    name: 'middle_name',
    length: 255,
    type: 'varchar',
    nullable: true,
  })
  middleName: string;

  @Column({
    name: 'last_name',
    length: 255,
    type: 'varchar',
    nullable: false,
  })
  lastName: string;

  @Column({
    name: 'email',
    length: 255,
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @Column({
    name: 'phone_number',
    length: 255,
    type: 'varchar',
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    name: 'banned',
    type: 'boolean',
    default: false,
  })
  banned: boolean;

  @OneToMany(() => CustomerEntity, (customer) => customer.salesAgent)
  customers: CustomerEntity[];
}
