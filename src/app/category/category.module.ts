import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material/material.module';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CategoryGridActionComponent } from './category-grid-action/category-grid-action.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDeleteComponent } from './category-delete/category-delete.component';
import { CategoryFilterComponent } from './category-filter/category-filter.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [CategoryDetailsComponent, CategoryGridActionComponent, CategoryListComponent, CategoryDeleteComponent, CategoryFilterComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  entryComponents: [
    CategoryDetailsComponent, CategoryGridActionComponent, CategoryDeleteComponent
  ],exports:[
    NgSelectModule
  ]
})
export class CategoryModule { }
