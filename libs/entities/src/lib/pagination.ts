import { ApiProperty } from '@nestjs/swagger';
import { IPagination } from './pagination.interface';

class Meta {
  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  itemCount: number;

  @ApiProperty()
  itemsPerPage: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  currentPage: number;
}

class Links {
  @ApiProperty({
    example: 'http://localhost:3333/api?limit=10',
  })
  first: string;

  @ApiProperty({
    example: 'http://localhost:3333/api?page=1&limit=10',
  })
  previous: string;

  @ApiProperty({
    example: 'http://localhost:3333/api?page=2&limit=10',
  })
  next: string;

  @ApiProperty({
    example: 'http://localhost:3333/api?page=8&limit=10',
  })
  last: string;
}

export class Pagination<Item> implements IPagination<Item> {
  items: Item[];

  @ApiProperty({
    type: Meta,
  })
  meta: Meta;

  @ApiProperty({
    type: Links,
  })
  links: Links;
}
