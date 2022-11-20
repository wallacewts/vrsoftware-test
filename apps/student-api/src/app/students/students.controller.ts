import { Body, Controller, Get, Inject, Param, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorResponse, Student } from '@vrsoftware/entities';
import {
  StudentsService,
  UpdateStudentDto,
} from '@vrsoftware/nest-students-module';

@ApiTags('Students')
@Controller('student')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    @Inject('ADMIN_API_SERVICE')
    private readonly adminApiClient: ClientProxy
  ) {}

  @Put(':id')
  @ApiNotFoundResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @ApiOkResponse({ type: Student })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateStudentDto
  ): Promise<Student> {
    const student = await this.studentsService.update(id, dto);

    this.adminApiClient.emit('student_data_changed', student);

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
