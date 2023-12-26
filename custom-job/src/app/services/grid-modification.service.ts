import { Injectable } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, ColumnApi, GridOptions } from 'ag-grid-community';
// import { GridColumnDefOptions } from '../interfaces/grid-column-def-options';
@Injectable({
  providedIn: 'root',
})
export class GridModificationService {
  constructor() {}

  gridOptions: GridOptions = {
    rowSelection: 'single',
    rowHeight: 30,
    rowClass: 'row-grid-style',
    tooltipShowDelay: 100,
    animateRows: true,
  };

  defaultColDef: ColDef = {
    sortable: true,
    sortingOrder: ['asc', 'desc'],
    filter: true,
    resizable: true,
    wrapText: true,
    autoHeight: true,
  };

  defaultFilterParams = {
    buttons: ['apply', 'reset'],
    closeOnApply: true,
  };

  // createColumnDef(width: number, options: GridColumnDefOptions = {}) {
  //   let columnDef: ColDef = {
  //     filterParams: this.defaultFilterParams,
  //     minWidth: width,
  //   };
  //   if (options.field) {
  //     columnDef['field'] = options.field;
  //   }
  //   if (options.headerName) {
  //     columnDef['headerName'] = options.headerName;
  //   }
  //   if (options.colId) {
  //     columnDef['colId'] = options.colId;
  //   }
  //   if (options.cellClass) {
  //     columnDef['cellClass'] = options.cellClass;
  //   }

  //   if (options.getQuickFilterText) {
  //     columnDef['getQuickFilterText'] = options.getQuickFilterText;
  //   }

  //   if (options.suppressSizeToFit !== undefined) {
  //     columnDef['suppressSizeToFit'] = options.suppressSizeToFit;
  //   }

  //   if (options.cellRenderer) {
  //     columnDef['cellRenderer'] = (params: any) =>
  //       options.cellRenderer!(params);
  //   }

  //   return columnDef;
  // }

  autoSizeAll(
    exemptedColumns: string[],
    gridColumnApi: ColumnApi,
    agGrid: AgGridAngular
  ) {
    const allColumnIds: string[] = [];
    gridColumnApi.getColumns()?.forEach((column: any) => {
      if (!exemptedColumns.includes(column.getId())) {
        allColumnIds.push(column.getId());
      }
    });
    gridColumnApi.autoSizeColumns(allColumnIds, false);
    agGrid.api.sizeColumnsToFit();
  }
}
