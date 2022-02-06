import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerManagementRoutingModule } from './customer-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material/material.module';
import { CustomerManagementDetailsComponent } from './customer-management-details/customer-management-details.component';
import { CustomerManagementGridActionComponent } from './customer-management-grid-action/customer-management-grid-action.component';
import { CustomerManagementListComponent } from './customer-management-list/customer-management-list.component';
import { CustomerManagementDeleteComponent } from './customer-management-delete/customer-management-delete.component';


@NgModule({
  declarations: [
    CustomerManagementDetailsComponent,
    CustomerManagementGridActionComponent,
    CustomerManagementListComponent,
    CustomerManagementDeleteComponent],
  imports: [
    CommonModule,
    CustomerManagementRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    CustomerManagementDetailsComponent, CustomerManagementGridActionComponent, CustomerManagementDeleteComponent
  ]
})
export class CustomerManagementModule { }
