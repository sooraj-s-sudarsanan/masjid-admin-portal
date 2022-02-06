import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticPageNameRoutingModule } from './static-page-name-routing.module';
import { StaticPageNameDetailsComponent } from './static-page-name-details/static-page-name-details.component';
import { StaticPageNameGridActionComponent } from './static-page-name-grid-action/static-page-name-grid-action.component';
import { StaticPageNameListComponent } from './static-page-name-list/static-page-name-list.component';
import { StaticPageNameDeleteComponent } from './static-page-name-delete/static-page-name-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material/material.module';

@NgModule({
  declarations: [
    StaticPageNameDetailsComponent,
    StaticPageNameGridActionComponent,
    StaticPageNameListComponent,
    StaticPageNameDeleteComponent],
  imports: [
    CommonModule,
    StaticPageNameRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    StaticPageNameDetailsComponent,
    StaticPageNameGridActionComponent,
    StaticPageNameDeleteComponent]
})
export class StaticPageNameModule { }
