import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { InstallmentEntity } from '../../../data-access/entities/installment.entity';
import { BaseResolver } from '../base.resolver';
import { InstallmentsService } from '../../../services/installments/installments.service';
import { CreateInstallmentDTO } from './types/create-installment.dto';
import { UpdateInstallmentDTO } from './types/update-installment.dto';
import { InstallmentDataLoaders } from '../../../dataloader/installment-data-loader/types/installment.data-loader';

@Resolver(() => InstallmentEntity)
export class InstallmentsResolver extends BaseResolver(InstallmentEntity) {
  constructor(private readonly installmentService: InstallmentsService) {
    super();
  }

  @Query(() => InstallmentEntity, {
    description: 'Returns an installment entity for the specified ID',
  })
  async installment(
    @Args('id', {
      type: () => Int,
      description: 'ID of the installment to be retrieved',
    })
    id: number,
  ) {
    return await this.installmentService.findOne(id);
  }

  @Mutation(() => InstallmentEntity, {
    description: 'Creates a new installment for a specific purchase',
  })
  async createInstallment(
    @Args('createInstallmentDTO') createInstallmentDto: CreateInstallmentDTO,
  ) {
    return await this.installmentService.createInstallment(
      createInstallmentDto,
    );
  }

  @Mutation(() => InstallmentEntity, {
    description: 'Updates an existing installment by ID',
  })
  async updateInstallment(
    @Args('id', {
      type: () => Int,
      description: 'ID of the installment to be updated',
    })
    id: number,
    @Args('UpdateInstallmentDTO') updateInstallmentDto: UpdateInstallmentDTO,
  ) {
    return await this.installmentService.updateInstallment(
      id,
      updateInstallmentDto,
    );
  }

  @Mutation(() => InstallmentEntity, {
    description: 'Marks an installment as paid',
  })
  async markPaid(
    @Args('id', {
      type: () => Int,
      description: 'ID of the installment to be updated',
    })
    id: number,
  ) {
    return await this.installmentService.markPaid(id);
  }

  @Mutation(() => InstallmentEntity, {
    description: 'Marks an installment as unpaid',
  })
  async markUnpaid(
    @Args('id', {
      type: () => Int,
      description: 'ID of the installment to be updated',
    })
    id: number,
  ) {
    return await this.installmentService.markUnpaid(id);
  }

  @ResolveField()
  async purchase(
    @Parent() installment: InstallmentEntity,
    @Context()
    {
      installmentDataLoaders,
    }: { installmentDataLoaders: InstallmentDataLoaders },
  ) {
    const { id } = installment;
    const { purchasesDataLoader } = installmentDataLoaders;

    return await purchasesDataLoader.load(id);
  }
}
