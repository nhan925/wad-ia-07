import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User, RefreshToken } from '../common/entities';

// Load environment variables
config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: +configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  entities: [User, RefreshToken],
  migrations: ['dist/database/migrations/*.js'],
  migrationsTableName: 'migrations',
  ssl:
    configService.get('DATABASE_SSL') === 'true'
      ? {
          rejectUnauthorized: false,
        }
      : false,
});
