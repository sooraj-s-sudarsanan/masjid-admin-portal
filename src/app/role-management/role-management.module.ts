import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleManagementRoutingModule } from './role-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material/material.module';
import { RoleManagementDetailsComponent } from '../role-management/role-management-details/role-management-details.component';
import { RoleManagementGridActionComponent } from '../role-management/role-management-grid-action/role-management-grid-action.component';
import { RoleManagementListComponent } from '../role-management/role-management-list/role-management-list.component';
import { RoleManagementDeleteComponent } from '../role-management/role-management-delete/role-management-delete.component';
import { RoleUpdatePermissionComponent } from './role-update-permission/role-update-permission.component';

@NgModule({
  declarations: [
    RoleManagementDetailsComponent,
    RoleManagementGridActionComponent,
    RoleManagementListComponent,
    RoleManagementDeleteComponent,
    RoleUpdatePermissionComponent
  ],
  imports: [
    CommonModule,
    RoleManagementRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    RoleManagementDetailsComponent,
    RoleManagementGridActionComponent,
    RoleManagementDeleteComponent,
    RoleUpdatePermissionComponent
  ]
})
export class RoleManagementModule { }
