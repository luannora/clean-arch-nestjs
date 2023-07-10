import { EntitySchema } from 'typeorm';
import { IVehicle } from '@domain/vehicle/entities/vehicle.entity';

export const VehicleSchema = new EntitySchema<IVehicle>({
  name: 'vehicles',
  tableName: 'vehicles',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    plate: {
      type: 'varchar',
      length: 7,
    },
    observation: {
      type: 'varchar',
      length: 255,
      nullable: true,
    },
    createdAt: { name: 'created_at', type: 'timestamptz', createDate: true },
    updatedAt: { name: 'updated_at', type: 'timestamptz', updateDate: true },
    deletedAt: {
      name: 'deleted_at',
      type: 'timestamptz',
      nullable: true,
      deleteDate: true,
    },
  },
  relations: {
    user: {
      target: 'users',
      type: 'many-to-one',
      cascade: ['insert', 'update'],
      joinColumn: {
        name: 'user_id',
      },
      nullable: false,
    },
    vehicleCategory: {
      target: 'vehicle_category',
      type: 'one-to-one',
      cascade: ['insert', 'update'],
      joinColumn: {
        name: 'vehicle_category_id',
      },
      nullable: false,
    },
  },
});
