import { Component, OnInit } from '@angular/core';
import { NotificationsGridActionComponent } from '../notifications-grid-action/notifications-grid-action.component';
import { NotificationsDetailsComponent } from '../notifications-details/notifications-details.component';
import { NotificationsDeleteComponent } from '../notifications-delete/notifications-delete.component';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { PermissionService } from 'src/app/core/services/permission.service';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss']
})
export class NotificationsListComponent implements OnInit {

  columns = [
    { prop: 'notifName', name: 'Notif. Name' },
    { prop: 'notifChannel', name: 'Notif. Channel' },
    { prop: 'notifTriggerOn', name: 'Notif. Trigger On' },
    { prop: 'notifGroup.groupName', name: 'Group Name' }
  ];

  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${ModuleKeyModel.notifications.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: NotificationsGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    {
      type: `Info`,
      matTooltip: `${ModuleKeyModel.notifications.name} Info`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `info`,
      dialogComponent: NotificationsDetailsComponent,
      hasPermission: this.permissionService.hasPermission('Info')
    },
    {
      type: `Edit`,
      matTooltip: `${ModuleKeyModel.notifications.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: NotificationsGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${ModuleKeyModel.notifications.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: NotificationsDeleteComponent,
      hasPermission: this.permissionService.hasPermission('Delete')
    }
  ];


  dialogSize = {
    width: '700px',
    height: '500px'
  };

  constructor(
    public permissionService: PermissionService
  ) { }

  ngOnInit() {
  }
  get moduleKeyModel() {
    return ModuleKeyModel;
  }
}
