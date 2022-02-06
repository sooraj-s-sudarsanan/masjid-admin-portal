import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MappingRoutingModule } from './mapping-routing.module';
import { MappingDetailsComponent } from './mapping-details/mapping-details.component';
import { MappingGridActionComponent } from './mapping-grid-action/mapping-grid-action.component';
import { MappingListComponent } from './mapping-list/mapping-list.component';
import { MappingDeleteComponent } from './mapping-delete/mapping-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material/material.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MappingFilterComponent } from './mapping-filter/mapping-filter.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IndividualEditComponent } from './individual-edit/individual-edit.component';

@NgModule({
  declarations: [MappingDetailsComponent, MappingGridActionComponent, MappingListComponent, MappingDeleteComponent, MappingFilterComponent, IndividualEditComponent],
  imports: [
    CommonModule,
    MappingRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxMaterialTimepickerModule,
    FlexLayoutModule
  ],
  entryComponents: [MappingDetailsComponent, MappingGridActionComponent, MappingDeleteComponent],
  exports: [NgxMaterialTimepickerModule]
})
export class MappingModule { }
