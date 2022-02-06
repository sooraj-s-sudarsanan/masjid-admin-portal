import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsersManagementRoutingModule } from './admin-users-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material/material.module';
import { AdminUsersManagementDetailsComponent } from './admin-users-management-details/admin-users-management-details.component';
import { AdminUsersManagementGridActionComponent } from './admin-users-management-grid-action/admin-users-management-grid-action.component';
import { AdminUsersManagementListComponent } from './admin-users-management-list/admin-users-management-list.component';
import { AdminUsersManagementDeleteComponent } from './admin-users-management-delete/admin-users-management-delete.component';
import { AdminUsersChangePasswordComponent } from './admin-users-change-password/admin-users-change-password.component';
import { AdminUsersFilterComponent } from './admin-users-filter/admin-users-filter.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    AdminUsersManagementDetailsComponent,
    AdminUsersManagementGridActionComponent,
    AdminUsersManagementListComponent,
    AdminUsersManagementDeleteComponent,
    AdminUsersChangePasswordComponent,
    AdminUsersFilterComponent
  ],
  imports: [
    CommonModule,
    AdminUsersManagementRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  entryComponents: [
    AdminUsersManagementDetailsComponent,
    AdminUsersManagementGridActionComponent,
    AdminUsersManagementDeleteComponent
  ]
})
export class AdminUsersManagementModule { }
