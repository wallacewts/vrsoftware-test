import { Body, Controller, Get, Param, Put } from '@nestjs/common';
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
  constructor(private readonly studentsService: StudentsService) {}

  @Put(':id')
  @ApiNotFoundResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @ApiOkResponse({ type: Student })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateStudentDto
  ): Promise<Student> {
    return this.studentsService.update(id, dto);
  }

  @Get(':name')
  @ApiNotFoundResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @ApiOkResponse({ type: Student })
  getByName(@Param('name') name: string): Promise<Student> {
    return this.studentsService.getByName(name);
  }
}
