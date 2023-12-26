import { Component, ViewChild } from '@angular/core';
import { Job } from 'src/app/Interfaces/job.interface';
import {
  CellClickedEvent,
  ColDef,
  ColumnApi,
  GridOptions,
  GridReadyEvent,
} from 'ag-grid-community';
import { GridModificationService } from 'src/app/services/grid-modification.service';
import { Observable } from 'rxjs';
import { GRID_CONSTANTS } from 'src/app/constants/ag-grid.constants';
import { AgGridAngular } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { ROUTE_PATHS } from 'src/app/constants/route-paths.constants';
import { JobService } from 'src/app/services/job.service';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent {
  gridOptions: GridOptions = this.gridModificationService.gridOptions;
  defaultColDef: ColDef = this.gridModificationService.defaultColDef;
  public gridColumnApi!: ColumnApi;

  public rowData: Job[] = [];

  constructor(
    private gridModificationService: GridModificationService,
    private jobService: JobService,
    private router: Router
  ) {}
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  ngOnInit() {
    this.fetchJobs();
  }

  fetchJobs() {
    this.jobService.getAllJobs().subscribe((jobs) => {
      this.rowData = [this.addNewRow as Job].concat(jobs);
    });
  }

  onGridReady(params: GridReadyEvent) {
    if (Object.keys(params).length) {
      this.gridColumnApi = params.columnApi;
    }
    this.gridOptions.api?.setRowData(this.rowData);
    this.onGridSizeChanged();
  }

  onGridSizeChanged() {
    this.gridModificationService.autoSizeAll(
      ['JobTitle'],
      this.gridColumnApi,
      this.agGrid
    );
  }

  onCellClicked(e: CellClickedEvent): void {
    if (e.data.jobId === GRID_CONSTANTS.ADD_NEW_ROW_ID) {
      //add form
      this.router.navigate([ROUTE_PATHS.ADD_JOB]);
    } else if (e.colDef.colId === 'edit') {
      // edit form
      this.router.navigate([
        ROUTE_PATHS.EDIT_JOB.replace(':id', e.data.jobId.toString()),
      ]);
    }
  }

  public columnDefs: ColDef[] = [
    {
      headerName: 'Title',
      field: 'jobTitle',
      cellClass: (params) => {
        return params.data.jobId === GRID_CONSTANTS.ADD_NEW_ROW_ID
          ? 'add-grid-column'
          : '';
      },
      minWidth: GRID_CONSTANTS.GRID_COLUMN_WIDTHS.TITLE,
      suppressSizeToFit: true,
    },
    {
      headerName: 'Start Time',
      field: 'startDate',
      minWidth: GRID_CONSTANTS.GRID_COLUMN_WIDTHS.DATE,
      suppressSizeToFit: true,
    },
    {
      headerName: 'Expiry Time',
      field: 'expiryDate',
      minWidth: GRID_CONSTANTS.GRID_COLUMN_WIDTHS.DATE,
      suppressSizeToFit: true,
    },
    {
      field: 'duration',
      minWidth: GRID_CONSTANTS.GRID_COLUMN_WIDTHS.DURATION,
      suppressSizeToFit: true,
    },
    {
      headerName: '',
      colId: 'edit',
      cellClass: 'edit-icon',
      cellRenderer: (params: any) => {
        return params.data.jobId === GRID_CONSTANTS.ADD_NEW_ROW_ID
          ? ''
          : '<i class="fa fa-solid fa-pen-to-square"></i>';
      },
      suppressSizeToFit: true,
      filter: false,
      resizable: false,
    },
    {
      headerName: '',
      colId: 'delete',
      cellClass: 'delete-icon',
      cellRenderer: (params: any) => {
        return params.data.jobId === GRID_CONSTANTS.ADD_NEW_ROW_ID
          ? ''
          : '<i class="fa fa-solid fa-xmark"></i>';
      },
      suppressSizeToFit: true,
      filter: false,
      resizable: false,
    },
  ];

  addNewRow = {
    jobId: GRID_CONSTANTS.ADD_NEW_ROW_ID,
    jobTitle: 'Add New Job',
  };
}
