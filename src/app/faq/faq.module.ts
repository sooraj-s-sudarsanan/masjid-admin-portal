import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaqRoutingModule } from './faq-routing.module';
import { FaqGridActionComponent } from './faq-grid-action/faq-grid-action.component';
import { FaqListComponent } from './faq-list/faq-list.component';
import { FaqDeleteComponent } from './faq-delete/faq-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material/material.module';


@NgModule({
  declarations: [FaqGridActionComponent, FaqListComponent, FaqDeleteComponent],
  imports: [
    CommonModule,
    FaqRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [FaqGridActionComponent, FaqDeleteComponent]
})
export class FaqModule { }
