import { Component, OnInit } from '@angular/core';
import { NotificationGroupGridActionComponent } from '../notification-group-grid-action/notification-group-grid-action.component';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { NotificationGroupDetailsComponent } from '../notification-group-details/notification-group-details.component';
import { PermissionService } from 'src/app/core/services/permission.service';
import { NotificationGroupDeleteComponent } from '../notification-group-delete/notification-group-delete.component';

@Component({
  selector: 'app-notification-group-list',
  templateUrl: './notification-group-list.component.html',
  styleUrls: ['./notification-group-list.component.scss']
})
export class NotificationGroupListComponent implements OnInit {

  columns = [
    { prop: 'groupType', name: 'Group Type' },
    { prop: 'groupName', name: 'Group Name' },
    { prop: 'platform', name: 'Platform' }
  ];

  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.notificationGroup.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: NotificationGroupGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    {
      type: `Info`,
      matTooltip: `${this.moduleKeyModel.notificationGroup.name} Info`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `info`,
      dialogComponent: NotificationGroupDetailsComponent,
      hasPermission: this.permissionService.hasPermission('Info')
    },
    {
      type: 'Edit',
      matTooltip: `${this.moduleKeyModel.notificationGroup.name} Edit`,
      matTooltipClass: 'tooltip',
      matTooltipPosition: 'above',
      color: 'primary',
      matIcon: 'edit',
      dialogComponent: NotificationGroupGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.notificationGroup.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: NotificationGroupDeleteComponent,
      hasPermission: this.permissionService.hasPermission('Delete')
    }
  ];

  constructor(
    public permissionService: PermissionService
  ) { }

  ngOnInit() {
  }
  get moduleKeyModel() {
    return ModuleKeyModel;
  }
}
