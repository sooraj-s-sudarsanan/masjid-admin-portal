import { Component, OnInit } from '@angular/core';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { PermissionService } from 'src/app/core/services/permission.service';
import { RoleManagementGridActionComponent } from 'src/app/role-management/role-management-grid-action/role-management-grid-action.component';
import { ManageAppDetailsGridActionComponent } from '../manage-app-details-grid-action/manage-app-details-grid-action.component';

@Component({
  selector: 'app-manage-app-detailss-list',
  templateUrl: './manage-app-detailss-list.component.html',
  styleUrls: ['./manage-app-detailss-list.component.scss']
})
export class ManageAppDetailssListComponent implements OnInit {

  columns = [
    { prop: 'deviceType.deviceType', name: 'Device Type' },
    { prop: 'latestVersion', name: 'Latest Version' },
    { prop: 'downloadUrl', name: 'Download Url' }
    
  ];

  actionButtons = [   
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.appManagement.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: ManageAppDetailsGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.appManagement.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: ManageAppDetailsGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    }
  ];

  constructor( public permissionService: PermissionService) { }

  ngOnInit(): void {
  }
  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }
}
