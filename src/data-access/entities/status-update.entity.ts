import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { StatusEntity } from './status.entity';
import { UserEntity } from './user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'status_updates' })
export class StatusUpdateEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    name: 'comment',
    length: 255,
    nullable: false,
  })
  @Field({
    description: 'The comment attached with a status update',
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
  @Field((type) => UserEntity, {
    description: 'The user that applied the status update',
    nullable: false,
  })
  user: UserEntity;
}
