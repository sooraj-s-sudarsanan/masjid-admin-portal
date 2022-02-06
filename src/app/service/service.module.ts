import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ServiceGridActionComponent } from './service-grid-action/service-grid-action.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceDeleteComponent } from './service-delete/service-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material/material.module';
import { ServiceFilterComponent } from './service-filter/service-filter.component';


@NgModule({
  declarations: [ServiceDetailsComponent, ServiceGridActionComponent, ServiceListComponent, ServiceDeleteComponent, ServiceFilterComponent],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ServiceDetailsComponent, ServiceGridActionComponent, ServiceDeleteComponent]
})
export class ServiceModule { }
