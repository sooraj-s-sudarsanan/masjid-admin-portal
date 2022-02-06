import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceModuleRoutingModule } from './service-module-routing.module';
import { ServiceModuleDetailsComponent } from './service-module-details/service-module-details.component';
import { ServiceModuleGridActionComponent } from './service-module-grid-action/service-module-grid-action.component';
import { ServiceModuleListComponent } from './service-module-list/service-module-list.component';
import { ServiceModuleDeleteComponent } from './service-module-delete/service-module-delete.component';


@NgModule({
  declarations: [ServiceModuleDetailsComponent, ServiceModuleGridActionComponent, ServiceModuleListComponent, ServiceModuleDeleteComponent],
  imports: [
    CommonModule,
    ServiceModuleRoutingModule
  ]
})
export class ServiceModuleModule { }
