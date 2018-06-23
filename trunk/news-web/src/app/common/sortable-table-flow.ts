import {Injectable} from "@angular/core";
import {SupportSortingTable} from "./support-sorting-table";
import {SupportPaginationTable} from "./support-pagination-table";
import {PaginationParams} from "./pagination-params";
import {TableQueryResponse} from "./table-query-response";

@Injectable()
export class SortableTableFlow {

  sort(table: SupportSortingTable, sort: string): void {

    if (table.sort == sort) {

      table.order = table.order == "asc" ? "desc" : "asc";
    } else {

      table.sort = sort;
      table.order = "desc";

    }

    table.doSort_();
  }

  getSortingClass(table: SupportSortingTable, field: string): string {

    return table.sort != field ? 'sorting' : (table.order == 'desc' ? 'sorting_desc' : "sorting_asc");
  }

  goToPage(table: SupportPaginationTable, pageIndex: number): void {

    table.curPageIndex = pageIndex;

    table._goToPage();
  }

  buildPaginationParams(form: SupportPaginationTable): PaginationParams {

    let paginationParams = new PaginationParams();

    paginationParams.maxPageSize = form.maxPageSize;
    paginationParams.sort = form.sort;
    paginationParams.order = form.order;
    paginationParams.pageIndex = form.curPageIndex;

    return paginationParams;
  }

  afterPaginate(form: SupportPaginationTable, result: TableQueryResponse): void {

    form.count = result.dataSize;
    form.curPageIndex = result.pageIndex;
  }
}
