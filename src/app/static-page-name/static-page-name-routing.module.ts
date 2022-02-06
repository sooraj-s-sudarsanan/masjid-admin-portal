import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaticPageNameListComponent } from './static-page-name-list/static-page-name-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: StaticPageNameListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticPageNameRoutingModule { }
