import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportConfigListComponent } from './report-config/report-config-list/report-config-list.component';
import { ReportTypeGridActionComponent } from './report-type/report-type-grid-action/report-type-grid-action.component';
import { ReportTypeListComponent } from './report-type/report-type-list/report-type-list.component';

const routes: Routes = [
  {
    path: 'type',
    component: ReportTypeListComponent
  },
  {
    path: 'config',
    component: ReportConfigListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportManagementRoutingModule { }
