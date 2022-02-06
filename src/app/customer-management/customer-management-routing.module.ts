import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerManagementListComponent } from './customer-management-list/customer-management-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: CustomerManagementListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerManagementRoutingModule { }
