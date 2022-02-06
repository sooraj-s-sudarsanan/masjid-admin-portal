import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileDataRoutingModule } from './file-data-routing.module';
import { FileDataDeleteComponent } from './file-data-delete/file-data-delete.component';
import { FileDataDetailsComponent } from './file-data-details/file-data-details.component';
import { FileDataGridActionComponent } from './file-data-grid-action/file-data-grid-action.component';
import { FileDataListComponent } from './file-data-list/file-data-list.component';
import { FileDataFilterComponent } from './file-data-filter/file-data-filter.component';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [FileDataDeleteComponent, FileDataDetailsComponent, FileDataGridActionComponent, FileDataListComponent, FileDataFilterComponent],
  imports: [
    CommonModule,
    FileDataRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    FileDataDeleteComponent,
    FileDataDetailsComponent,
    FileDataGridActionComponent
  ],
})
export class FileDataModule { }
