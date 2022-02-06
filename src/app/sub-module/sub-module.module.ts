import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubModuleRoutingModule } from './sub-module-routing.module';
import { SubModuleGridActionComponent } from './sub-module-grid-action/sub-module-grid-action.component';
import { SubModuleListComponent } from './sub-module-list/sub-module-list.component';
import { SubModuleDeleteComponent } from './sub-module-delete/sub-module-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material/material.module';
import { SubModuleFilterComponent } from './sub-module-filter/sub-module-filter.component';


@NgModule({
  declarations: [SubModuleGridActionComponent, SubModuleListComponent, SubModuleDeleteComponent, SubModuleFilterComponent],
  imports: [
    CommonModule,
    SubModuleRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [SubModuleGridActionComponent, SubModuleDeleteComponent]
})
export class SubModuleModule { }
