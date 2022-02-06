import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MappingListComponent } from './mapping-list/mapping-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: MappingListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MappingRoutingModule { }
