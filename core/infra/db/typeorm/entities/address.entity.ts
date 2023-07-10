import { IAddress } from '@domain/address/entities/address.entity';
import { EntitySchema } from 'typeorm';

export const AddressSchema = new EntitySchema<IAddress>({
  name: 'addresses',
  columns: {
    id: { type: 'uuid', primary: true, generated: 'uuid' },
    addressName: {
      name: 'address_name',
      type: 'varchar',
      length: '255',
      nullable: true,
    },
    addressZipCode: {
      name: 'address_zipcode',
      type: 'varchar',
      length: '8',
      nullable: true,
    },
    addressNumber: {
      name: 'address_number',
      type: 'varchar',
      length: '20',
      nullable: true,
    },
    addressComplement: {
      name: 'address_complement',
      type: 'varchar',
      length: '255',
      nullable: true,
    },
    federalState: {
      name: 'federal_state',
      type: 'varchar',
      length: '10',
      nullable: true,
    },
    city: {
      name: 'city',
      type: 'varchar',
      length: '255',
      nullable: true,
    },
    district: {
      name: 'district',
      type: 'varchar',
      length: '255',
      nullable: true,
    },
  },
});
