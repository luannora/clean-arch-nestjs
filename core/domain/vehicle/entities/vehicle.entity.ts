import { IUser } from '@domain/user/entities/user.entity';
import { IVehicleCategory } from './vehicle-category.entity';

export interface IVehicle {
  id?: string;
  plate?: string;
  observation?: string;
  vehicleCategory?: IVehicleCategory;
  user?: IUser;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
