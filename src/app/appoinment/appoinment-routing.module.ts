import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppoinmentListComponent } from './appoinment-list/appoinment-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: AppoinmentListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppoinmentRoutingModule { }
