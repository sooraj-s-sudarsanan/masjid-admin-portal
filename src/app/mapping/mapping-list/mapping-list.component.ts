import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { RoleModel } from 'src/app/core/model/role-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { InitializeService } from 'src/app/core/services/initialize.service';
import { PermissionService } from 'src/app/core/services/permission.service';
import { MappingDetailsComponent } from '../mapping-details/mapping-details.component';
import { MappingFilterComponent } from '../mapping-filter/mapping-filter.component';
import { MappingGridActionComponent } from '../mapping-grid-action/mapping-grid-action.component';

@Component({
  selector: 'app-mapping-list',
  templateUrl: './mapping-list.component.html',
  styleUrls: ['./mapping-list.component.scss']
})
export class MappingListComponent implements OnInit, OnDestroy {


  filterComponent: any = MappingFilterComponent;
  subscriptions: Subscription[] = [];
  userInfo: any;
  filter = null;

  dialogSize = {
    width: '80%'
  };

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
          }else if (this.userInfo.userRole.roleName.toUpperCase() === RoleModel.branchAdmin) {
            this.filter = `branch.merchantBean.merchantId==${this.userInfo.merchant.merchantId}`;
          }
        }
      }
    }));
  }

  columns = [
    { prop: 'branch.branchName', name: 'Branch' },
    { prop: 'services.serviceName', name: 'Service' },
    { prop: 'servicePersonLevelBooking', name: 'Person Level Booking' },
    { prop: 'numberOfBookingAllowed', name: 'Booking Allowed' },
    { prop: 'servicePersonStartTime', name: 'Start Time' },
    { prop: 'servicePersonEndTime', name: 'End Time' }
  ];
  actionButtons = [
    {
      type: `Info`,
      matTooltip: `${this.moduleKeyModel.mapping.name} Info`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `info`,
      dialogComponent: MappingDetailsComponent,
      hasPermission: this.permissionService.hasPermission('Info')
    },
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.mapping.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: MappingGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.mapping.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: MappingGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    }
  ];
  ngOnInit(): void {
  }
  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
