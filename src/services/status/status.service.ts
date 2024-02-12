import { Injectable } from '@nestjs/common';
import { StatusRepository } from '../../data-access/repositories/status.repository';
import { CreateStatusDTO } from '../../graphql/resolvers/status/types/create-status.dto';
import { StatusEntity } from '../../data-access/entities/status.entity';
import { UpdateStatusDTO } from '../../graphql/resolvers/status/types/update-status.dto';

@Injectable()
export class StatusService {
  constructor(private readonly statusRepository: StatusRepository) {}

  async createStatus(createStatusDto: CreateStatusDTO): Promise<StatusEntity> {
    const result = await this.statusRepository.createStatus(createStatusDto);

    return await this.statusRepository.findOne(result.identifiers[0].id);
  }

  async updateStatus(
    id: number,
    updateStatusDto: UpdateStatusDTO,
  ): Promise<StatusEntity> {
    await this.statusRepository.updateStatus(id, updateStatusDto);

    return await this.statusRepository.findOne(id);
  }

  async findOne(id: number): Promise<StatusEntity> {
    return await this.statusRepository.findOne(id);
  }

  async deleteStatus(id: number): Promise<void> {
    await this.statusRepository.findOne(id);
  }
}
