import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationGroupRoutingModule } from './notification-group-routing.module';

import { NotificationGroupDetailsComponent } from './notification-group-details/notification-group-details.component';
import { NotificationGroupGridActionComponent } from './notification-group-grid-action/notification-group-grid-action.component';
import { NotificationGroupListComponent } from './notification-group-list/notification-group-list.component';
import { NotificationGroupDeleteComponent } from './notification-group-delete/notification-group-delete.component';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    NotificationGroupDetailsComponent,
    NotificationGroupGridActionComponent,
    NotificationGroupListComponent,
    NotificationGroupDeleteComponent
  ],
  imports: [
    CommonModule,
    NotificationGroupRoutingModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  entryComponents: [
    NotificationGroupDetailsComponent,
    NotificationGroupGridActionComponent,
    NotificationGroupDeleteComponent
  ]
})
export class NotificationGroupModule { }
