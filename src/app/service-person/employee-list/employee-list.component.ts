import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookingStatusTextModel } from 'src/app/core/model/common-model';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { RoleModel } from 'src/app/core/model/role-model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { InitializeService } from 'src/app/core/services/initialize.service';
import { PermissionService } from 'src/app/core/services/permission.service';
import { CreateLoginComponent } from '../create-login/create-login.component';
import { EmployeeDeleteComponent } from '../employee-delete/employee-delete.component';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { EmployeeFilterComponent } from '../employee-filter/employee-filter.component';
import { EmployeeGridActionComponent } from '../employee-grid-action/employee-grid-action.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  filterComponent: any = EmployeeFilterComponent;
  columns = [
    { prop: 'servicePersonDisplayName', name: 'Display Name' },   
    { prop: 'email', name: 'Email' },
    { prop: 'mobileNo', name: 'Mobile No.' },
    { prop: 'servicePersonBookingAllowed', name: 'Person level Booking' },
  ];
  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.employee.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: EmployeeGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    {
      type: `Info`,
      matTooltip: `${this.moduleKeyModel.employee.name} Info`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `info`,
      dialogComponent: EmployeeDetailsComponent,
      hasPermission: this.permissionService.hasPermission('Info')
    },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.employee.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: EmployeeGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.employee.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: EmployeeDeleteComponent,
      hasPermission: this.permissionService.hasPermission('Delete')
    },
    {
      type: `Edit`,
      matTooltip: `Create login credentials`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `login`,
      dialogComponent: CreateLoginComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    }
  ];
  subscriptions: Subscription[] = [];
  userInfo: any;
  filter = null;

  constructor(
    public permissionService: PermissionService,
    public initializeService: InitializeService,
    public headerService: HeaderService,
    public authService: AuthenticationService
  ) { 
    this.headerService.toggleSpinner(true);
    this.subscriptions.push(this.initializeService.initializeCompleted$.subscribe((response) => {
      if (response) {
      
        if (this.authService.userInfo) {
          this.userInfo = this.authService.userInfo;
          if (this.userInfo.userRole.roleName.toUpperCase() === RoleModel.merchantAdmin) {
            this.filter = `merchantId==${this.userInfo.merchant.merchantId}`;
          }else if (this.userInfo.userRole.roleName.toUpperCase() === RoleModel.branchAdmin) {
            this.filter = `branchId==${this.userInfo.merchant.merchantId}`;
          }          
        }      
        this.headerService.toggleSpinner(false);
      }
    }));
  }

  dialogSize = {
    width: '70%',
    height: 'auto'
  };

  ngOnInit(): void {
  }
  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }
}
