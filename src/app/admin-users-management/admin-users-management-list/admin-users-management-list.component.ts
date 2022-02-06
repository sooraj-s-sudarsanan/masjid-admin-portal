import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { RoleModel } from 'src/app/core/model/role-model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { InitializeService } from 'src/app/core/services/initialize.service';
import { PermissionService } from 'src/app/core/services/permission.service';
import { AdminUsersChangePasswordComponent } from '../admin-users-change-password/admin-users-change-password.component';
import { AdminUsersFilterComponent } from '../admin-users-filter/admin-users-filter.component';
import { AdminUsersManagementDeleteComponent } from '../admin-users-management-delete/admin-users-management-delete.component';
import { AdminUsersManagementDetailsComponent } from '../admin-users-management-details/admin-users-management-details.component';
// tslint:disable-next-line: max-line-length
import { AdminUsersManagementGridActionComponent } from '../admin-users-management-grid-action/admin-users-management-grid-action.component';

@Component({
  selector: 'app-admin-users-management-list',
  templateUrl: './admin-users-management-list.component.html',
  styleUrls: ['./admin-users-management-list.component.scss']
})
export class AdminUsersManagementListComponent implements OnInit, OnDestroy {

  filterComponent: any = AdminUsersFilterComponent;
  filter = null;
  subscriptions: Subscription[] = [];
  userInfo: any;

  columns = [
    { prop: 'fullName', name: 'Full Name' },
    { prop: 'mobileNo', name: 'Mobile No' },
    { prop: 'email', name: 'Email' },
    { prop: 'userRole.roleName', name: 'Role' }
  ];

  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.adminUserManagement.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: AdminUsersManagementGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    {
      type: `Info`,
      matTooltip: `${this.moduleKeyModel.adminUserManagement.name} Info`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `info`,
      dialogComponent: AdminUsersManagementDetailsComponent,
      hasPermission: this.permissionService.hasPermission('Info')
    },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.adminUserManagement.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: AdminUsersManagementGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.adminUserManagement.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: AdminUsersManagementDeleteComponent,
      hasPermission: this.permissionService.hasPermission('Delete')
    },
    {
      type: `ChangePassword`,
      matTooltip: `Change Password`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `below`,
      color: `primary`,
      matIcon: `security`,
      dialogComponent: AdminUsersChangePasswordComponent,
      hasPermission: this.permissionService.hasPermission('New')
    }
  ];
  constructor(
    private permissionService: PermissionService,
    public initializeService: InitializeService,
    public headerService: HeaderService,
    public authService: AuthenticationService
  ) {

    this.headerService.toggleSpinner(true);
    this.subscriptions.push(this.initializeService.initializeCompleted$.subscribe((response) => {
      if (response) {
        this.headerService.toggleSpinner(false);
        if (this.authService.userInfo) {
          this.userInfo = this.authService.userInfo;
          if (this.userInfo.userRole.roleName.toUpperCase() === RoleModel.merchantAdmin) {
            this.filter = `merchant.merchantId==${this.userInfo.merchant.merchantId}`;
          } else if (this.userInfo.userRole.roleName.toUpperCase() === RoleModel.branchAdmin) {
            this.filter = `branch.branchId==${this.userInfo.branch.branchId}`;
          }
        }
      }
    }));
  }

  ngOnInit(): void {
  }
  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
