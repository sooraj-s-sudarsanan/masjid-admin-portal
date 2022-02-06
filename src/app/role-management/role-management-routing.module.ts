import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleManagementListComponent } from './role-management-list/role-management-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: RoleManagementListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleManagementRoutingModule { }
