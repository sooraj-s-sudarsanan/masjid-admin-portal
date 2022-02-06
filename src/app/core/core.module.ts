import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ManageGridComponent } from './manage-grid/manage-grid.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './Interceptors/auth-interceptor.service';
import { SidebarNavigationComponent } from './sidebar-navigation/sidebar-navigation.component';
import { TruncatePipe } from './pipe/truncate.pipe';
import { ManageGridRowDeleteComponent } from './manage-grid-row-delete/manage-grid-row-delete.component';
import { WorkingDaysComponent } from './working-days/working-days.component';
import { CropperDialogComponent } from './cropper-dialog/cropper-dialog.component';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [
    ManageGridComponent, 
    SidebarNavigationComponent, 
    ManageGridRowDeleteComponent, 
    WorkingDaysComponent, 
    CropperDialogComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    MaterialModule,
    HttpClientModule,
    ImageCropperModule
  ],
  exports: [
    ManageGridComponent,
    SidebarNavigationComponent,
    MaterialModule,
    ManageGridRowDeleteComponent,
    WorkingDaysComponent,
    ImageCropperModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  entryComponents: [
    ManageGridRowDeleteComponent    
  ]
})
export class CoreModule { }
