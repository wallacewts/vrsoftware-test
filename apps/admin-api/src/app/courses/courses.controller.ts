import {
  Body,
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Course, ErrorResponse, PaginationQuery } from '@vrsoftware/entities';
import {
  CoursesService,
  CreateCourseDto,
} from '@vrsoftware/nest-courses-module';
import { ApiOkResponsePaginated } from '@vrsoftware/nest-custom-decorators';
import { Pagination } from 'nestjs-typeorm-paginate';

@ApiTags('Courses')
@Controller('course')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly configService: ConfigService,
    @Inject('STUDENT_API_SERVICE')
    private readonly studentApiClient: ClientProxy
  ) {}

  @Post()
  @ApiUnprocessableEntityResponse({ type: ErrorResponse })
  @ApiBadRequestResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @ApiCreatedResponse({ type: Course })
  async create(@Body() dto: CreateCourseDto): Promise<Course> {
    const course = await this.coursesService.create(dto);

    this.studentApiClient.emit('course_data_changed', course);

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

    this.studentApiClient.emit('course_data_changed', course);

    return course;
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @ApiUnprocessableEntityResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @ApiOkResponsePaginated(Course)
  getAll(
    @Query() { page, limit }: PaginationQuery
  ): Promise<Pagination<Course>> {
    const globalPrefix = this.configService.get('ADMIN_API_GLOBAL_PREFIX');

    return this.coursesService.getAll({
      page,
      limit,
      route: `/${globalPrefix}/course`,
    });
  }
}
