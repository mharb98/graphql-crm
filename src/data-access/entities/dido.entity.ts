import { Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'didos' })
export class DidoEntity extends BaseEntity {}
