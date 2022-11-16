import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import path from 'path';

const migrationsPath = path.join(__dirname, 'migrations', '*.ts');

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('STUDENT_DATABASE_HOST'),
  port: configService.get('STUDENT_DATABASE_PORT'),
  username: configService.get('STUDENT_DATABASE_USERNAME'),
  password: configService.get('STUDENT_DATABASE_PASSWORD'),
  database: configService.get('STUDENT_DATABASE_NAME'),
  migrations: [migrationsPath],
});
