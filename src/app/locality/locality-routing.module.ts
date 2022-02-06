import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalityListComponent } from './locality-list/locality-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: LocalityListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalityRoutingModule { }
