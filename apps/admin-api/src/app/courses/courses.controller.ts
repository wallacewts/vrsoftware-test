import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Course, ErrorResponse } from '@vrsoftware/entities';
import {
  CoursesService,
  CreateCourseDto,
} from '@vrsoftware/nest-courses-module';

@ApiTags('Courses')
@Controller('course')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiUnprocessableEntityResponse({ type: ErrorResponse })
  @ApiBadRequestResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @ApiCreatedResponse({ type: Course })
  create(@Body() dto: CreateCourseDto): Promise<Course> {
    return this.coursesService.create(dto);
  }

  @Put(':id')
  @ApiUnprocessableEntityResponse({ type: ErrorResponse })
  @ApiNotFoundResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @ApiCreatedResponse({ type: Course })
  update(
    @Param('id') id: string,
    @Body() dto: CreateCourseDto
  ): Promise<Course> {
    return this.coursesService.update(id, dto);
  }
}
