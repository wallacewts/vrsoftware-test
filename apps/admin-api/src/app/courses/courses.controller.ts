import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import {
  Course,
  ErrorResponse,
  ICourse,
  IPagination,
  PaginationQuery,
} from '@vrsoftware/entities';
import {
  CoursesService,
  CreateCourseDto,
} from '@vrsoftware/nest-courses-module';
import { ApiOkResponsePaginated } from '@vrsoftware/nest-custom-decorators';

@ApiTags('Courses')
@Controller('course')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly configService: ConfigService,
    private readonly amqpConnection: AmqpConnection
  ) {}

  @Post()
  @ApiUnprocessableEntityResponse({ type: ErrorResponse })
  @ApiBadRequestResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @ApiCreatedResponse({ type: Course })
  async create(@Body() dto: CreateCourseDto): Promise<Course> {
    const course = await this.coursesService.create(dto);

    this.amqpConnection.publish('amq.topic', 'model.course.created', course);

    return course;
  }

  @Put(':id')
  @ApiUnprocessableEntityResponse({ type: ErrorResponse })
  @ApiNotFoundResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @ApiCreatedResponse({ type: Course })
  async update(
    @Param('id') id: string,
    @Body() dto: CreateCourseDto
  ): Promise<Course> {
    const course = await this.coursesService.update(id, dto);

    this.amqpConnection.publish('amq.topic', 'model.course.updated', course);

    return course;
  }

  @Get()
  @ApiUnprocessableEntityResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @ApiOkResponsePaginated(Course)
  getAll(
    @Query() { page, limit }: PaginationQuery
  ): Promise<IPagination<ICourse>> {
    const globalPrefix = this.configService.get('ADMIN_API_GLOBAL_PREFIX');

    return this.coursesService.getAll({
      page,
      limit,
      route: `/${globalPrefix}/course`,
    });
  }
}
