import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationGroupListComponent } from './notification-group-list/notification-group-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: NotificationGroupListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationGroupRoutingModule { }
