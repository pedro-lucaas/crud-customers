export const PAGE_SIZE = 10;

export class Pagination<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;

  constructor({ items, page, limit = PAGE_SIZE, total }:
    { items: T[], total: number, page: number, limit: number }
  ) {
    this.items = items;
    this.page = page;
    this.pageSize = limit;
    this.total = total;
    this.totalPages = Math.ceil(total / limit);
  }
}