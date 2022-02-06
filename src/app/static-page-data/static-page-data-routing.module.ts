import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaticPageDataListComponent } from './static-page-data-list/static-page-data-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: StaticPageDataListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticPageDataRoutingModule { }
