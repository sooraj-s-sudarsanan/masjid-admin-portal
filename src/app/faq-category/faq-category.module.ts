import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqCategoryRoutingModule } from './faq-category-routing.module';
import { FaqCategoryGridActionComponent } from './faq-category-grid-action/faq-category-grid-action.component';
import { FaqCategoryListComponent } from './faq-category-list/faq-category-list.component';
import { FaqCategoryDeleteComponent } from './faq-category-delete/faq-category-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material/material.module';


@NgModule({
  declarations: [FaqCategoryGridActionComponent, FaqCategoryListComponent, FaqCategoryDeleteComponent],
  imports: [
    CommonModule,
    FaqCategoryRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [FaqCategoryGridActionComponent,  FaqCategoryDeleteComponent]
})
export class FaqCategoryModule { }
