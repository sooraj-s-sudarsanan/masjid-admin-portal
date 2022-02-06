import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqCategoryListComponent } from './faq-category-list/faq-category-list.component';

const routes: Routes = [
  {
    path: 'list',
    component: FaqCategoryListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqCategoryRoutingModule { }
