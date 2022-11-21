import { Controller, Get, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiInternalServerErrorResponse,
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
import { CoursesService } from '@vrsoftware/nest-courses-module';
import { ApiOkResponsePaginated } from '@vrsoftware/nest-custom-decorators';

@ApiTags('Courses')
@Controller('course')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly configService: ConfigService
  ) {}

  @Get()
  @ApiUnprocessableEntityResponse({ type: ErrorResponse })
  @ApiInternalServerErrorResponse({ type: ErrorResponse })
  @ApiOkResponsePaginated(Course)
  getAll(
    @Query() { page, limit }: PaginationQuery
  ): Promise<IPagination<ICourse>> {
    const globalPrefix = this.configService.get('STUDENT_API_GLOBAL_PREFIX');

    return this.coursesService.getAll({
      page,
      limit,
      route: `/${globalPrefix}/course`,
    });
  }
}
