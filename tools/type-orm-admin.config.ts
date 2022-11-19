import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import path from 'path';

const migrationsPath = path.join(__dirname, 'migrations', '*.ts');

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('ADMIN_DATABASE_HOST'),
  port: configService.get('ADMIN_DATABASE_PORT'),
  username: configService.get('ADMIN_DATABASE_USERNAME'),
  password: configService.get('ADMIN_DATABASE_PASSWORD'),
  database: configService.get('ADMIN_DATABASE_NAME'),
  migrations: [migrationsPath],
});
