import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { StatusUpdateEntity } from './status-update.entity';

@Entity({ name: 'statuses' })
export class StatusEntity extends BaseEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;

  @OneToMany(() => StatusUpdateEntity, (statusUpdate) => statusUpdate.status)
  statusUpdates: StatusUpdateEntity[];
}
