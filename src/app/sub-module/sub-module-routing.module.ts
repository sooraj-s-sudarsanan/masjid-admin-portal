import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubModuleListComponent } from './sub-module-list/sub-module-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: SubModuleListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubModuleRoutingModule { }
