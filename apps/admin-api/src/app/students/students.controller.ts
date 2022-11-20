import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ErrorResponse, Student } from '@vrsoftware/entities';
import {
  CreateStudentDto,
  StudentsService,
} from '@vrsoftware/nest-students-module';

@ApiTags('Students')
@Controller('student')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly amqpConnection: AmqpConnection
  ) {}

  @Post()
  @ApiUnprocessableEntityResponse({ type: ErrorResponse })
  @ApiBadRequestResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @ApiCreatedResponse({ type: Student })
  async create(@Body() dto: CreateStudentDto): Promise<Student> {
    const student = await this.studentsService.create(dto);

    this.amqpConnection.publish('amq.topic', 'model.student.created', student);

    return student;
  }
}
