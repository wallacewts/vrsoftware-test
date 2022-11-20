import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
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
    @Inject('STUDENT_API_SERVICE')
    private readonly studentApiClient: ClientProxy
  ) {}

  @Post()
  @ApiUnprocessableEntityResponse({ type: ErrorResponse })
  @ApiBadRequestResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @ApiCreatedResponse({ type: Student })
  async create(@Body() dto: CreateStudentDto): Promise<Student> {
    const student = await this.studentsService.create(dto);

    this.studentApiClient.emit('student_data_changed', student);

    return student;
  }
}
