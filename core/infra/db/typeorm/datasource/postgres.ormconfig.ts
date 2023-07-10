import { DataSource } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: '.env' });

export const postgres = new DataSource({
  name: 'default',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['dist/infra/db/typeorm/entities/*.entity{.ts,.js}'],
  migrations: ['dist/infra/db/typeorm/migrations/*{.ts,.js}'],
  migrationsTableName: 'migration_table',
  logging: process.env.DB_LOG === 'true',
});
