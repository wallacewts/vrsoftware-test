import {
  Body,
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
