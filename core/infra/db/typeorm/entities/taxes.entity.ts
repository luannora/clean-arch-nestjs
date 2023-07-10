import { ITaxes } from '@domain/taxes/entities/taxes.entity';
import { EntitySchema } from 'typeorm';

const TaxesSchema = new EntitySchema<ITaxes>({
  name: 'Taxes',
  columns: {
    id: {
      type: 'varchar',
      primary: true,
      generated: 'uuid',
      nullable: true,
    },
    feePercent: {
      name: 'fee_percent',
      type: 'decimal',
      precision: 5,
      scale: 2,
    },
    feeFixed: {
      name: 'fee_fixed',
      type: 'decimal',
      precision: 10,
      scale: 2,
    },
    startAt: {
      name: 'start_at',
      type: 'timestamp',
    },
    endAt: {
      name: 'end_at',
      type: 'timestamp',
    },
    active: {
      type: 'boolean',
    },
  },
});

export default TaxesSchema;