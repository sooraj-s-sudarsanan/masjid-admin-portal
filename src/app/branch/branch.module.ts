import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchRoutingModule } from './branch-routing.module';
import { BranchDetailsComponent } from './branch-details/branch-details.component';
import { BranchGridActionComponent } from './branch-grid-action/branch-grid-action.component';
import { BranchListComponent } from './branch-list/branch-list.component';
import { BranchDeleteComponent } from './branch-delete/branch-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material/material.module';
import { BranchFilterComponent } from './branch-filter/branch-filter.component';
import { AddFileComponent } from './add-file/add-file.component';
import { Ng2ImgMaxModule, Ng2ImgMaxService } from 'ng2-img-max';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgSelectModule } from '@ng-select/ng-select';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { WeblinkComponent } from './weblink/weblink.component';
@NgModule({
  declarations: [BranchDetailsComponent, BranchGridActionComponent, BranchListComponent, BranchDeleteComponent, BranchFilterComponent, AddFileComponent, WeblinkComponent],
  imports: [
    CommonModule,
    BranchRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2ImgMaxModule,
    NgxMaterialTimepickerModule,
    ImageCropperModule,
    NgSelectModule,
    FlexLayoutModule,
    CKEditorModule
  ],
  providers: [    
    Ng2ImgMaxService
  ], 
  exports:[
    Ng2ImgMaxModule,
    NgxMaterialTimepickerModule,
    ImageCropperModule,
    NgSelectModule,
    CKEditorModule
  ], 
  entryComponents: [BranchDetailsComponent, BranchGridActionComponent, BranchDeleteComponent,WeblinkComponent]
})
export class BranchModule { }
