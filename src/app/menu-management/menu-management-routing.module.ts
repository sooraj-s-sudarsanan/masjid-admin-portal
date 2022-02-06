import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuManagementListComponent } from './menu-management-list/menu-management-list.component';


const routes: Routes = [
  {
    path: 'list',
    component: MenuManagementListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuManagementRoutingModule { }
