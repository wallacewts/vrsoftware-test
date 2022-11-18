import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { StudentsModule } from './students/students.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        ADMIN_API_PORT: Joi.number().required(),
        ADMIN_DATABASE_HOST: Joi.string().required(),
        ADMIN_DATABASE_PORT: Joi.number().required(),
        ADMIN_DATABASE_USERNAME: Joi.string().required(),
        ADMIN_DATABASE_PASSWORD: Joi.string().required(),
        ADMIN_DATABASE_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.ADMIN_DATABASE_HOST,
      port: +process.env.ADMIN_DATABASE_PORT,
      username: process.env.ADMIN_DATABASE_USERNAME,
      password: process.env.ADMIN_DATABASE_PASSWORD,
      database: process.env.ADMIN_DATABASE_NAME,
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
      logging: true,
    }),
    StudentsModule,
  ],
})
export class AppModule {}
