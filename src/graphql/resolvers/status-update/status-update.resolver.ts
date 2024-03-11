import { Args, Int, Mutation, ResolveField, Resolver } from '@nestjs/graphql';
import { StatusUpdateEntity } from '../../../data-access/entities/status-update.entity';
import { BaseResolver } from '../base.resolver';
import { CreateStatusUpdateDTO } from './types/create-status-update.dto';
import { StatusUpdateService } from '../../../services/status-update/status-update.service';

@Resolver(() => StatusUpdateEntity)
export class StatusUpdateResolver extends BaseResolver(StatusUpdateEntity) {
  constructor(private readonly statusUpdateService: StatusUpdateService) {
    super();
  }

  @Mutation(() => StatusUpdateEntity, {
    description: 'Update the status of a customer with a comment attached',
  })
  async createStatusUpdate(
    @Args('CreateStatusUpdateDTO') createStatusUpdateDto: CreateStatusUpdateDTO,
  ): Promise<StatusUpdateEntity> {
    return await this.statusUpdateService.createStatusUpdate(
      createStatusUpdateDto,
    );
  }

  @Mutation(() => StatusUpdateEntity, {
    description: 'Deletes an existing status update',
  })
  async deleteStatusUpdate(
    @Args('id', {
      type: () => Int,
      description: 'ID of the status update to be deleted',
    })
    id: number,
  ): Promise<StatusUpdateEntity> {
    return await this.statusUpdateService.deleteStatusUpdate(id);
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
