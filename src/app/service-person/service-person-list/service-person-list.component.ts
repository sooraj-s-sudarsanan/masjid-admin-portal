import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { RoleModel } from 'src/app/core/model/role-model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { InitializeService } from 'src/app/core/services/initialize.service';
import { PermissionService } from 'src/app/core/services/permission.service';
import { CreateLoginComponent } from '../create-login/create-login.component';
import { ServicePersonDetailsComponent } from '../service-person-details/service-person-details.component';
import { ServicePersonFilterComponent } from '../service-person-filter/service-person-filter.component';
import { ServicePersonGridActionComponent } from '../service-person-grid-action/service-person-grid-action.component';

@Component({
  selector: 'app-service-person-list',
  templateUrl: './service-person-list.component.html',
  styleUrls: ['./service-person-list.component.scss']
})
export class ServicePersonListComponent implements OnInit {


  filterComponent: any = ServicePersonFilterComponent;
  subscriptions: Subscription[] = [];
  userInfo: any;
  filter = null;

  dialogSize = {
    width: '80%'
  };
  columns = [
    { prop: 'branch.merchantBean.merchantName', name: 'Merchant Name' },
    { prop: 'branch.branchName', name: 'Branch Name' },
    { prop: 'services.serviceName', name: 'Services Name' },
    { prop: 'numberOfBookingAllowed', name: 'Booking Allowed' }
  ];
  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.servicePerson.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: ServicePersonGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    {
      type: `Info`,
      matTooltip: `${this.moduleKeyModel.servicePerson.name} List`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `engineering`,
      dialogComponent: ServicePersonDetailsComponent,
      hasPermission: this.permissionService.hasPermission('Info')
    },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.servicePerson.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: ServicePersonGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    }    
  ];
  constructor(
    public permissionService: PermissionService,
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
            this.filter = `branch.merchantBean.merchantId==${this.userInfo.merchant.merchantId}`;
          } else if (this.userInfo.userRole.roleName.toUpperCase() === RoleModel.branchAdmin) {
            this.filter = `branch.merchantBean.merchantId==${this.userInfo.merchant.merchantId}`;
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
}
