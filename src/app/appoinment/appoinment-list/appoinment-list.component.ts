import { OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookingStatusTextModel } from 'src/app/core/model/common-model';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { RoleModel } from 'src/app/core/model/role-model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { InitializeService } from 'src/app/core/services/initialize.service';
import { PermissionService } from 'src/app/core/services/permission.service';
import { AppoinmentCancelComponent } from '../appoinment-cancel/appoinment-cancel.component';
import { AppoinmentCompletedComponent } from '../appoinment-completed/appoinment-completed.component';
import { AppoinmentDetailsComponent } from '../appoinment-details/appoinment-details.component';
import { AppoinmentFilterComponent } from '../appoinment-filter/appoinment-filter.component';
import { AppoinmentGridActionComponent } from '../appoinment-grid-action/appoinment-grid-action.component';
import { DownloadReportComponent } from '../download-report/download-report.component';
@Component({
  selector: 'app-appoinment-list',
  templateUrl: './appoinment-list.component.html',
  styleUrls: ['./appoinment-list.component.scss']
})
export class AppoinmentListComponent implements OnInit, OnDestroy {

  filterComponent: any = AppoinmentFilterComponent;
  subscriptions: Subscription[] = [];
  userInfo: any;
  filter = null;
  @ViewChild('editTmpl', { static: true }) editTmpl: TemplateRef<any>;
  columns = null;

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
            this.filter = `serviceMappingBean.branch.merchantBean.merchantId==${this.userInfo.merchant.merchantId}`;
          } else if (this.userInfo.userRole.roleName.toUpperCase() === RoleModel.branchAdmin) {
            this.filter = `serviceMappingBean.branch.merchantBean.merchantId==${this.userInfo.merchant.merchantId}`;
          }
        }
        if (this.filter) {
          this.filter = `${this.filter}##bookingStatus==${BookingStatusTextModel.BKG_CNF}`;
        } else {
          //this.filter =`bookingStatus==${BookingStatusTextModel.BKG_CNF}`
        }
        this.headerService.toggleSpinner(false);
      }
    }));
  }

  actionButtons = [
    {
      type: `New`,
      matTooltip: `New Appoinment`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: AppoinmentGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    {
      type: `Info`,
      matTooltip: `${this.moduleKeyModel.appointment.name} Details`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `info`,
      dialogComponent: AppoinmentDetailsComponent,
      hasPermission: this.permissionService.hasPermission('Info')
    },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.appointment.name} Update`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: AppoinmentGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.appointment.name} Cancel`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: AppoinmentCancelComponent,
      hasPermission: this.permissionService.hasPermission('Delete')
    },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.appointment.name} Completed`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `done`,
      dialogComponent: AppoinmentCompletedComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Edit`,
      matTooltip: `Download Report`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `download`,
      dialogComponent: DownloadReportComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    }
  ];

  dialogSize = {
    width: '75%'
  };

  ngOnInit(): void {
    this.columns = [
      { prop: 'bookingNumber', name: 'Booking Num.' },
      { prop: 'serviceMappingBean.branch.branchName', name: 'Branch' },
      { prop: 'serviceMappingBean.services.serviceName', name: 'Service' },
      { cellTemplate: this.editTmpl, prop: 'bookingDate', name: 'Date & Time' },
      // { prop: 'bookingStartTime', name: 'Time' },
      { prop: 'branchServicePerson.servicePersonName', name: 'Service Person' },
      { prop: 'bookingStatus', name: 'Status' }
    ];
  }
  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
