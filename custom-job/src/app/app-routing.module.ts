import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './components/view/view.component';
import { AddJobComponent } from './components/add-job/add-job.component';
import { EditJobComponent } from './components/edit-job/edit-job.component';
import { ROUTE_PATHS } from './constants/route-paths.constants';
const routes: Routes = [
  { path: ROUTE_PATHS.ADD_JOB, component: AddJobComponent },
  { path: ROUTE_PATHS.EDIT_JOB, component: EditJobComponent },
  { path: ROUTE_PATHS.VIEW, component: ViewComponent, pathMatch: 'full' },
  { path: ROUTE_PATHS.WILDCARD, component: ViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
