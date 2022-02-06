import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUsersManagementListComponent } from './admin-users-management-list/admin-users-management-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: AdminUsersManagementListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUsersManagementRoutingModule { }
