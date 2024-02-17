import { BadRequestException, Injectable } from '@nestjs/common';
import { InstallmentsRepository } from '../../data-access/repositories/installments.repository';
import { CreateInstallmentDTO } from '../../graphql/resolvers/installments/types/create-installment.dto';
import { InstallmentEntity } from '../../data-access/entities/installment.entity';
import { UpdateInstallmentDTO } from '../../graphql/resolvers/installments/types/update-installment.dto';
import { PurchaseRepository } from '../../data-access/repositories/purchase.repository';

@Injectable()
export class InstallmentsService {
  constructor(
    private readonly purchaseRepository: PurchaseRepository,
    private readonly installmentsRepository: InstallmentsRepository,
  ) {}

  async createInstallment(
    createInstallmentDto: CreateInstallmentDTO,
  ): Promise<InstallmentEntity> {
    const { purchaseId, amount } = createInstallmentDto;
    let totalPaid = amount;

    const purchase = await this.purchaseRepository.findOne(purchaseId, {
      installments: true,
    });

    purchase.installments.forEach(
      (installment) => (totalPaid += installment.amount),
    );

    if (totalPaid > purchase.totalPrice) {
      throw new BadRequestException(
        'Added installment exceeds the total price of the purchase',
      );
    }

    const result = await this.installmentsRepository.createInstallment(
      createInstallmentDto,
    );

    return await this.installmentsRepository.findOne(result.identifiers[0].id);
  }

  async updateInstallment(
    id: number,
    updateInstallmentDto: UpdateInstallmentDTO,
  ): Promise<InstallmentEntity> {
    const { amount } = updateInstallmentDto;

    const oldInstallment = await this.installmentsRepository.findOne(id);

    if (oldInstallment.paid) {
      throw new BadRequestException('Old installment has already been paid');
    }

    const purchase = await this.purchaseRepository.findOne(
      oldInstallment.purchaseId,
      { installments: true },
    );

    let totalPaid = amount;

    purchase.installments.forEach((installment) => {
      totalPaid += installment.amount;
    });

    totalPaid = totalPaid - oldInstallment.amount;

    if (totalPaid > purchase.totalPrice) {
      throw new BadRequestException(
        'Added installment exceeds the total price of the purchase',
      );
    }

    await this.installmentsRepository.updateInstallment(
      id,
      updateInstallmentDto,
    );

    return await this.installmentsRepository.findOne(id);
  }

  async findOne(id: number): Promise<InstallmentEntity> {
    return await this.installmentsRepository.findOne(id);
  }

  async deleteInstallment(id: number): Promise<void> {
    await this.installmentsRepository.deleteInstallment(id);
  }

  async markPaid(id: number): Promise<InstallmentEntity> {
    await this.installmentsRepository.updateInstallment(id, { paid: true });

    return await this.installmentsRepository.findOne(id);
  }

  async markUnpaid(id: number): Promise<InstallmentEntity> {
    await this.installmentsRepository.updateInstallment(id, { paid: false });

    return await this.installmentsRepository.findOne(id);
  }

  async getPurchaseInstallments(purchaseIds: number[]): Promise<any> {
    const purchases = await this.purchaseRepository.listAll(
      { ids: purchaseIds },
      { installments: true },
    );

    return purchaseIds.map((purchaseId) => {
      return (
        purchases.find((purchase) => purchase.id === purchaseId).installments ||
        []
      );
    });
  }
}
