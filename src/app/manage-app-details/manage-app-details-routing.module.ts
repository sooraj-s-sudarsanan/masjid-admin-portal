import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageAppDetailssListComponent } from './manage-app-detailss-list/manage-app-detailss-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: ManageAppDetailssListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAppDetailsRoutingModule { }
