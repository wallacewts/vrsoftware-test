import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { ErrorResponse, IStudent, Student } from '@vrsoftware/entities';
import { ApiOkResponsePaginated } from '@vrsoftware/nest-custom-decorators';
import {
  CreateStudentDto,
  StudentsService,
} from '@vrsoftware/nest-students-module';

@ApiTags('Students')
@Controller('student')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly amqpConnection: AmqpConnection,
    private readonly configService: ConfigService
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

  @Get()
  @ApiUnprocessableEntityResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @ApiOkResponsePaginated(Student)
  getAll(): Promise<IStudent[]> {
    return this.studentsService.getAll();
  }

  @Put(':id')
  @ApiNotFoundResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @ApiOkResponse({ type: Student })
  async update(
    @Param('id') id: string,
    @Body() dto: CreateStudentDto
  ): Promise<Student> {
    const student = await this.studentsService.update(id, dto);

    this.amqpConnection.publish('amq.topic', 'model.student.updated', student);

    return student;
  }
}
