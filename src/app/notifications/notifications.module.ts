import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MaterialModule } from '../core/material/material.module';
import { NotificationsDeleteComponent } from './notifications-delete/notifications-delete.component';
import { NotificationsDetailsComponent } from './notifications-details/notifications-details.component';
import { NotificationsGridActionComponent } from './notifications-grid-action/notifications-grid-action.component';
import { NotificationsListComponent } from './notifications-list/notifications-list.component';
import { CoreModule } from '../core/core.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule, DateTimeAdapter, OWL_DATE_TIME_LOCALE, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';


export const MY_CUSTOM_FORMATS = {
  parseInput: 'l LT',
  fullPickerInput: 'l LT',
  datePickerInput: 'l LT',
  timePickerInput: 'LT',
  monthYearLabel: 'MMM YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM YYYY'
};

@NgModule({
  declarations: [NotificationsDeleteComponent, NotificationsDetailsComponent, NotificationsGridActionComponent, NotificationsListComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    OwlDateTimeModule,    
    OwlNativeDateTimeModule,   
  ],
  entryComponents: [
    NotificationsDeleteComponent,
    NotificationsDetailsComponent,
    NotificationsGridActionComponent
  ],
  exports: [
    CKEditorModule    
  ],
  providers: [
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS}
  ]
})
export class NotificationsModule { }
