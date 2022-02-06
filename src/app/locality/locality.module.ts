import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalityRoutingModule } from './locality-routing.module';
import { LocalityGridActionComponent } from './locality-grid-action/locality-grid-action.component';
import { LocalityListComponent } from './locality-list/locality-list.component';
import { LocalityDeleteComponent } from './locality-delete/locality-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material/material.module';


@NgModule({
  declarations: [LocalityGridActionComponent, LocalityListComponent, LocalityDeleteComponent],
  imports: [
    CommonModule,
    LocalityRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [LocalityGridActionComponent, LocalityDeleteComponent],
})
export class LocalityModule { }
