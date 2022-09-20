import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material/material.module';

import { ManageAppDetailsRoutingModule } from './manage-app-details-routing.module';
import { ManageAppDetailssListComponent } from './manage-app-detailss-list/manage-app-detailss-list.component';
import { ManageAppDetailsGridActionComponent } from './manage-app-details-grid-action/manage-app-details-grid-action.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageAppDetailsInfoComponent } from './manage-app-details-info/manage-app-details-info.component';
import { DateTimeAdapter, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MY_CUSTOM_FORMATS } from '../notifications/notifications.module';


@NgModule({
  declarations: [ManageAppDetailssListComponent,
     ManageAppDetailsGridActionComponent,
     ManageAppDetailsInfoComponent],
  imports: [
    CommonModule,
    ManageAppDetailsRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents:[
    ManageAppDetailsGridActionComponent
  ],
  providers: [
    {provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS}
  ]
})
export class ManageAppDetailsModule { }
