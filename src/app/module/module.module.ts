import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { ModuleGridActionComponent } from './module-grid-action/module-grid-action.component';
import { ModuleListComponent } from './module-list/module-list.component';
import { ModuleDeleteComponent } from './module-delete/module-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material/material.module';


@NgModule({
  declarations: [ModuleGridActionComponent, ModuleListComponent, ModuleDeleteComponent],
  imports: [
    CommonModule,
    ModuleRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ModuleGridActionComponent, ModuleDeleteComponent]
})
export class ModuleModule { }
