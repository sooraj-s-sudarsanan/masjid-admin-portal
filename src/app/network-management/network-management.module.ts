import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NetworkManagementRoutingModule } from './network-management-routing.module';
import { DetailsComponent } from './details/details.component';
import { GridActionComponent } from './grid-action/grid-action.component';
import { ListComponent } from './list/list.component';
import { DeleteComponent } from './delete/delete.component';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NetworkFilterComponent } from './network-filter/network-filter.component';


@NgModule({
  declarations: [DetailsComponent, GridActionComponent, ListComponent, DeleteComponent, NetworkFilterComponent],
  imports: [
    CommonModule,
    NetworkManagementRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    DetailsComponent, GridActionComponent, DeleteComponent
  ]
})
export class NetworkManagementModule { }
