import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportManagementRoutingModule } from './report-management-routing.module';
import { ReportTypeGridActionComponent } from './report-type/report-type-grid-action/report-type-grid-action.component';
import { ReportTypeListComponent } from './report-type/report-type-list/report-type-list.component';
import { ReportTypeDeleteComponent } from './report-type/report-type-delete/report-type-delete.component';
import { ReportTypeDetailsComponent } from './report-type/report-type-details/report-type-details.component';
import { ReportConfigGridActionComponent } from './report-config/report-config-grid-action/report-config-grid-action.component';
import { ReportConfigListComponent } from './report-config/report-config-list/report-config-list.component';
import { ReportConfigDeleteComponent } from './report-config/report-config-delete/report-config-delete.component';
import { ReportConfigDetailsComponent } from './report-config/report-config-details/report-config-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../core/material/material.module';
import { CoreModule } from '../core/core.module';
import { ReportConfigFilterComponent } from './report-config/report-config-filter/report-config-filter.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [ReportTypeGridActionComponent, ReportTypeListComponent, ReportTypeDeleteComponent, ReportTypeDetailsComponent, ReportConfigGridActionComponent, ReportConfigListComponent, ReportConfigDeleteComponent, ReportConfigDetailsComponent, ReportConfigFilterComponent],
  imports: [
    CommonModule,
    ReportManagementRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ]
})
export class ReportManagementModule { }
