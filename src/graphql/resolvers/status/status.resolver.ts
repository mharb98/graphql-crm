import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { StatusEntity } from '../../../data-access/entities/status.entity';
import { CreateStatusDTO } from './types/create-status.dto';
import { UpdateStatusDTO } from './types/update-status.dto';
import { BaseResolver } from '../base.resolver';
import { StatusService } from '../../../services/status/status.service';

@Resolver(() => StatusEntity)
export class StatusResolver extends BaseResolver(StatusEntity) {
  constructor(private readonly statusService: StatusService) {
    super();
  }

  @Query(() => StatusEntity, {
    name: 'status',
    description: 'Returns a status for the specified ID ',
  })
  async getStatus(
    @Args('id', {
      type: () => Int,
      description: 'ID of the status that needs to be returnd',
    })
    id: number,
  ) {
    return await this.statusService.findOne(id);
  }

  @Mutation(() => StatusEntity, { description: 'Creates a new status' })
  async createStatus(
    @Args('createStatusDto') createStatusDto: CreateStatusDTO,
  ) {
    return await this.statusService.createStatus(createStatusDto);
  }

  @Mutation(() => StatusEntity, { description: 'Updates a new status' })
  async updateStatus(
    @Args('id', {
      type: () => Int,
      description: 'ID of the status to be returned',
    })
    id: number,
    @Args('updateStatusDto') updateStatusDto: UpdateStatusDTO,
  ) {
    return await this.statusService.updateStatus(id, updateStatusDto);
  }

  @Mutation(() => StatusEntity, { description: 'Updates a new status' })
  async deleteStatus(
    @Args('id', {
      type: () => Int,
      description: 'ID of the status to be returned',
    })
    id: number,
  ) {
    return await this.statusService.deleteStatus(id);
  }
}
