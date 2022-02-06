import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicePersonListComponent } from './service-person-list/service-person-list.component';
import { EmployeeGridActionComponent } from '../service-person/employee-grid-action/employee-grid-action.component';
import { EmployeeListComponent } from '../service-person/employee-list/employee-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: ServicePersonListComponent
  },
  {
    path: 'employee-list',
    component: EmployeeListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicePersonRoutingModule { }
