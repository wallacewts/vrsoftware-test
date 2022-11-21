import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
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

  @Get(':name')
  @ApiNotFoundResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @ApiOkResponse({ type: Student })
  getByName(@Param('name') name: string): Promise<Student> {
    return this.studentsService.getByName(name);
  }
}
