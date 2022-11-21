import { IPaginationLinks, IPaginationMeta } from 'nestjs-typeorm-paginate';

export interface IPagination<Item> {
  items: Item[];
  meta: IPaginationMeta;
  links?: IPaginationLinks;
}
