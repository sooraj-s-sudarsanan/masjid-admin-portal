import { Component, OnInit } from '@angular/core';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { PermissionService } from 'src/app/core/services/permission.service';
import { RoleManagementDeleteComponent } from '../role-management-delete/role-management-delete.component';
import { RoleManagementGridActionComponent } from '../role-management-grid-action/role-management-grid-action.component';
import { RoleUpdatePermissionComponent } from '../role-update-permission/role-update-permission.component';
@Component({
  selector: 'app-role-management-list',
  templateUrl: './role-management-list.component.html',
  styleUrls: ['./role-management-list.component.scss']
})
export class RoleManagementListComponent implements OnInit {

  columns = [
    { prop: 'roleName', name: 'Role Name' },
    { prop: 'roleDesc', name: 'Desc.' }
  ];
  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.roleManagement.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: RoleManagementGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    // {
    //   type: `Info`,
    //   matTooltip: `${this.moduleKeyModel.roleManagement.name} Info`,
    //   matTooltipClass: `tooltip`,
    //   matTooltipPosition: `above`,
    //   color: `primary`,
    //   matIcon: `info`,
    //   dialogComponent: SubModuleDeleteComponent
    // },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.roleManagement.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: RoleManagementGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.roleManagement.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: RoleManagementDeleteComponent,
      hasPermission: this.permissionService.hasPermission('Delete')
    },
    {
      type: 'SetPermission',
      matTooltip: 'Set Menu Permission',
      matTooltipClass: 'tooltip',
      matTooltipPosition: 'above',
      color: 'primary',
      matIcon: 'settings',
      dialogComponent: RoleUpdatePermissionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    }
  ];
  constructor(
    public permissionService: PermissionService
  ) {
  }

  ngOnInit(): void {
  }
  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }
}
