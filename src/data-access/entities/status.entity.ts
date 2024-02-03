import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { StatusUpdateEntity } from './status-update.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'statuses' })
export class StatusEntity extends BaseEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  @Field({ description: 'The name of the status' })
  name: string;

  @OneToMany(() => StatusUpdateEntity, (statusUpdate) => statusUpdate.status)
  @Field(() => [StatusUpdateEntity], {
    description: 'The updates in which the status was used',
    nullable: true,
  })
  statusUpdates: StatusUpdateEntity[];
}
