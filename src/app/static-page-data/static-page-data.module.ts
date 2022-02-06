import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticPageDataRoutingModule } from './static-page-data-routing.module';
import { StaticPageDataDetailsComponent } from './static-page-data-details/static-page-data-details.component';
import { StaticPageDataGridActionComponent } from './static-page-data-grid-action/static-page-data-grid-action.component';
import { StaticPageDataListComponent } from './static-page-data-list/static-page-data-list.component';
import { StaticPageDataDeleteComponent } from './static-page-data-delete/static-page-data-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material/material.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    StaticPageDataDetailsComponent,
    StaticPageDataGridActionComponent,
    StaticPageDataListComponent,
    StaticPageDataDeleteComponent],
  imports: [
    CommonModule,
    StaticPageDataRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule
  ],
  entryComponents: [
    StaticPageDataDetailsComponent,
    StaticPageDataGridActionComponent,
    StaticPageDataDeleteComponent],
    exports:[
      CKEditorModule
    ]
})
export class StaticPageDataModule { }
