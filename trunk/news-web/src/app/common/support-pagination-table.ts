export interface SupportPaginationTable {

  count: number;
  maxPageSize: number;
  curPageIndex: number;
  sort: string; //ten field dang sort;
  order: string; //asc, des;

  _goToPage(): void;
}
