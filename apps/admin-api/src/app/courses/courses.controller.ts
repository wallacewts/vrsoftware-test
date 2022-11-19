import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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
import { Course, ErrorResponse } from '@vrsoftware/entities';
import {
  CoursesService,
  CreateCourseDto,
} from '@vrsoftware/nest-courses-module';
import { Pagination } from 'nestjs-typeorm-paginate';

@ApiTags('Courses')
@Controller('course')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly configService: ConfigService
  ) {}

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

  @Get()
  @ApiUnprocessableEntityResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @ApiOkResponse({ type: Pagination<Course> })
  getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10
  ): Promise<Pagination<Course>> {
    const globalPrefix = this.configService.get('ADMIN_API_GLOBAL_PREFIX');
    const twoMinutesInMs = 1000 * 60 * 2;

    return this.coursesService.getAll({
      page,
      limit,
      route: `/${globalPrefix}/course`,
      cacheQueries: {
        id: 'paginated_courses',
        milliseconds: twoMinutesInMs,
      },
    });
  }
}
