import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as Joi from 'joi';
import { StudentsModule } from './students/students.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        STUDENT_API_GLOBAL_PREFIX: Joi.string().required(),
        STUDENT_API_PORT: Joi.number().required(),
        STUDENT_DATABASE_HOST: Joi.string().required(),
        STUDENT_DATABASE_PORT: Joi.number().required(),
        STUDENT_DATABASE_USERNAME: Joi.string().required(),
        STUDENT_DATABASE_PASSWORD: Joi.string().required(),
        STUDENT_DATABASE_NAME: Joi.string().required(),
        RABBIT_MQ_HOST: Joi.string().required(),
      }),
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.STUDENT_DATABASE_HOST,
      port: +process.env.STUDENT_DATABASE_PORT,
      username: process.env.STUDENT_DATABASE_USERNAME,
      password: process.env.STUDENT_DATABASE_PASSWORD,
      database: process.env.STUDENT_DATABASE_NAME,
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
      logging: process.env.NODE_ENV === 'development',
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    StudentsModule,
    CoursesModule,
  ],
})
export class AppModule {}
