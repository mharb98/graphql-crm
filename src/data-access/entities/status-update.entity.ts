import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { StatusEntity } from './status.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'status_updates' })
export class StatusUpdateEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    name: 'comment',
    length: 255,
    nullable: false,
  })
  comment: string;

  @Column({ name: 'status_id' })
  statusId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => StatusEntity, (status) => status.statusUpdates, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'status_id' })
  status: StatusEntity;

  @ManyToOne(() => UserEntity, (user) => user.statusUpdates, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
