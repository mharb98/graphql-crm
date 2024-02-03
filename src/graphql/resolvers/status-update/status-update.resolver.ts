import { ResolveField, Resolver } from '@nestjs/graphql';
import { StatusUpdateEntity } from '../../../data-access/entities/status-update.entity';
import { BaseResolver } from '../base.resolver';

@Resolver(() => StatusUpdateEntity)
export class StatusUpdateResolver extends BaseResolver(StatusUpdateEntity) {
  constructor() {
    super();
  }

  @ResolveField()
  async status() {
    return {
      name: 'Status 1',
    };
  }

  @ResolveField()
  async user() {
    return {
      id: 1,
      firstName: 'Marwan',
      middleName: 'Salah',
      lastName: 'Harb',
      email: 'marwanharb65@outlook.com',
      phoneNumber: '+201013747167',
      banned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  @ResolveField()
  async customer() {
    return {
      id: 1,
      firstName: 'Marwan',
      lastName: 'Salah',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
