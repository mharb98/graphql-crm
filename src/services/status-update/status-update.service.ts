import { Injectable } from '@nestjs/common';
import { StatusUpdateRepository } from '../../data-access/repositories/status-update.repository';
import { CreateStatusUpdateDTO } from '../../graphql/resolvers/status-update/types/create-status-update.dto';
import { StatusUpdateEntity } from '../../data-access/entities/status-update.entity';

@Injectable()
export class StatusUpdateService {
  constructor(
    private readonly statusUpdateRepository: StatusUpdateRepository,
  ) {}

  async createStatusUpdate(
    createStatusUpdateDto: CreateStatusUpdateDTO,
  ): Promise<StatusUpdateEntity> {
    const result = await this.statusUpdateRepository.createStatusUpdate({
      userId: 29,
      ...createStatusUpdateDto,
    });

    return await this.statusUpdateRepository.findOne(result.identifiers[0].id);
  }

  async deleteStatusUpdate(id: number): Promise<void> {
    await this.statusUpdateRepository.deleteStatusUpdate(id);
  }
}
