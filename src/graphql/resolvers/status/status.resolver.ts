import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { StatusEntity } from '../../../data-access/entities/status.entity';
import { CreateStatusDTO } from './types/create-status.dto';
import { UpdateStatusDTO } from './types/update-status.dto';
import { BaseResolver } from '../base.resolver';

@Resolver(() => StatusEntity)
export class StatusResolver extends BaseResolver(StatusEntity) {
  constructor() {
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
    console.log(id);

    return {
      name: 'Status 1',
    };
  }

  @Mutation(() => StatusEntity, { description: 'Creates a new status' })
  async createStatus(
    @Args('createStatusDto') createStatusDto: CreateStatusDTO,
  ) {
    console.log(createStatusDto);

    return {
      name: 'Status 1',
    };
  }

  @Mutation(() => StatusEntity, { description: 'Updates a new status' })
  async updateStatus(
    @Args('updateStatusDto') updateStatusDto: UpdateStatusDTO,
  ) {
    console.log(updateStatusDto);

    return {
      name: 'Status 1',
    };
  }
}
