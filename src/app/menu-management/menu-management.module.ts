import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuManagementRoutingModule } from './menu-management-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material/material.module';
import { MenuManagementDetailsComponent } from './menu-management-details/menu-management-details.component';
import { MenuManagementGridActionComponent } from './menu-management-grid-action/menu-management-grid-action.component';
import { MenuManagementListComponent } from './menu-management-list/menu-management-list.component';
import { MenuManagementDeleteComponent } from './menu-management-delete/menu-management-delete.component';


@NgModule({
  declarations: [
    MenuManagementDetailsComponent, MenuManagementGridActionComponent, MenuManagementListComponent, MenuManagementDeleteComponent],
  imports: [
    CommonModule,
    MenuManagementRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    MenuManagementDetailsComponent, MenuManagementGridActionComponent, MenuManagementDeleteComponent
  ]
})
export class MenuManagementModule { }
