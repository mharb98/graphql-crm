import { Injectable } from '@nestjs/common';
import { UsersService } from '../services/users/users.service';
import { IDataloaders } from './dataloader.interface';
import * as DataLoader from 'dataloader';
import { UserEntity } from '../data-access/entities/user.entity';

@Injectable()
export class DataloaderService {
  constructor(private readonly usersService: UsersService) {}

  getLoaders(): IDataloaders {
    const usersLoader = this._createFriendsLoader();
    return {
      usersLoader,
    };
  }

  private _createFriendsLoader() {
    return new DataLoader<number, UserEntity>(
      async (keys: readonly number[]) =>
        await this.usersService.getCustomersSalesAgents(keys as number[]),
    );
  }
}
