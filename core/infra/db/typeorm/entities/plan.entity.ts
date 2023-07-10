import { IPlan } from '@domain/plan/entities/plan.entity';
import { EntitySchema } from 'typeorm';

export const AddressSchema = new EntitySchema<IPlan>({
  name: 'plans',
  columns: {
    id: { type: 'uuid', primary: true, generated: 'uuid' },
    planType: {
      name: 'plan_type',
      type: 'integer',
      nullable: true,
    },
    loadType: {
      name: 'load_type',
      type: 'integer',
      nullable: true,
    },
  },
});
