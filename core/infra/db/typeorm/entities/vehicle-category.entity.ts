import { EntitySchema } from 'typeorm';
import { IVehicleCategory } from '@domain/vehicle/entities/vehicle-category.entity';

export const VehicleCategorySchema = new EntitySchema<IVehicleCategory>({
  name: 'vehicle_category',
  tableName: 'vehicle_category',
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    categoryCodeGp: {
      name: 'category_code_gp',
      type: 'varchar',
      unique: true,
      nullable: false,
    },
    name: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    axles: {
      type: 'int4',
      nullable: false,
    },
  },
});
