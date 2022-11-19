import { ApiProperty } from '@nestjs/swagger';

export class PaginationQuery {
  @ApiProperty({
    default: 1,
    minimum: 1,
    required: false,
  })
  page: number;

  @ApiProperty({
    default: 10,
    minimum: 10,
    maximum: 50,
    required: false,
  })
  limit: number;
}
