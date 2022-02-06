import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileDataListComponent } from './file-data-list/file-data-list.component';


const routes: Routes = [
  {
    path: 'list',
    component: FileDataListComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileDataRoutingModule { }
