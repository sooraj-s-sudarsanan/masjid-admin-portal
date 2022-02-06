import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicePersonRoutingModule } from './service-person-routing.module';
import { ServicePersonDetailsComponent } from './service-person-details/service-person-details.component';
import { ServicePersonGridActionComponent } from './service-person-grid-action/service-person-grid-action.component';
import { ServicePersonListComponent } from './service-person-list/service-person-list.component';
import { ServicePersonDeleteComponent } from './service-person-delete/service-person-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material/material.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ServicePersonFilterComponent } from './service-person-filter/service-person-filter.component';
import { EmployeeGridActionComponent } from '../service-person/employee-grid-action/employee-grid-action.component';
import { EmployeeListComponent } from '../service-person/employee-list/employee-list.component';
import { EmployeeDeleteComponent } from '../service-person/employee-delete/employee-delete.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { EmployeeFilterComponent } from './employee-filter/employee-filter.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreateLoginComponent } from './create-login/create-login.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

@NgModule({
  declarations: [ServicePersonDetailsComponent,
    ServicePersonGridActionComponent,
    ServicePersonListComponent,
    ServicePersonDeleteComponent,
    ServicePersonFilterComponent,
    EmployeeGridActionComponent,
    EmployeeListComponent,
    EmployeeDeleteComponent,
    EmployeeFilterComponent,
    CreateLoginComponent,
    EmployeeDetailsComponent],
  imports: [
    CommonModule,
    ServicePersonRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxMaterialTimepickerModule,
    FlexLayoutModule
  ],
  entryComponents: [ServicePersonDetailsComponent,
    ServicePersonGridActionComponent,
    ServicePersonDeleteComponent,
    CreateLoginComponent,
    EmployeeDetailsComponent]
})
export class ServicePersonModule { }
