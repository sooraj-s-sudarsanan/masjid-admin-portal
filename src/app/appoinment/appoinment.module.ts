import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppoinmentRoutingModule } from './appoinment-routing.module';
import { AppoinmentGridActionComponent } from './appoinment-grid-action/appoinment-grid-action.component';
import { AppoinmentListComponent } from './appoinment-list/appoinment-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material/material.module';
import { AppoinmentFilterComponent } from './appoinment-filter/appoinment-filter.component';
import { AppoinmentCancelComponent } from './appoinment-cancel/appoinment-cancel.component';
import { AppoinmentCompletedComponent } from './appoinment-completed/appoinment-completed.component';
import { AppoinmentAddonsComponent } from './appoinment-addons/appoinment-addons.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppoinmentDetailsComponent } from './appoinment-details/appoinment-details.component';
import { DownloadReportComponent } from './download-report/download-report.component';

@NgModule({
  declarations: [
    AppoinmentGridActionComponent,
    AppoinmentListComponent,
    AppoinmentFilterComponent,
    AppoinmentCancelComponent,
    AppoinmentCompletedComponent,
    AppoinmentAddonsComponent,
    AppoinmentDetailsComponent,
    DownloadReportComponent],
  imports: [
    CommonModule,
    AppoinmentRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports: [
    FlexLayoutModule
  ],
  entryComponents: [AppoinmentGridActionComponent, 
    AppoinmentCompletedComponent,
     AppoinmentCancelComponent]
})
export class AppoinmentModule { }
