import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { RoleModel } from 'src/app/core/model/role-model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { InitializeService } from 'src/app/core/services/initialize.service';
import { PermissionService } from 'src/app/core/services/permission.service';
import { TaxServiceMappingFilterComponent } from '../tax-service-mapping-filter/tax-service-mapping-filter.component';
import { TaxServiceMappingDetailsComponent } from '../tax-service-mapping-details/tax-service-mapping-details.component';
import { TaxServiceMappingGridActionComponent } from '../tax-service-mapping-grid-action/tax-service-mapping-grid-action.component';

@Component({
  selector: 'app-tax-service-mapping-list',
  templateUrl: './tax-service-mapping-list.component.html',
  styleUrls: ['./tax-service-mapping-list.component.scss']
})
export class TaxServiceMappingListComponent implements OnInit, OnDestroy {

  filterComponent: any = TaxServiceMappingFilterComponent;
  subscriptions: Subscription[] = [];
  userInfo: any;
  filter = null;

  dialogSize = {
    width: '80%'
  };

  columns = [
    { prop: 'serviceMappingBean.branch.merchantBean.merchantName', name: 'Merchant' },
    { prop: 'serviceMappingBean.branch.branchName', name: 'Branch' },
    { prop: 'serviceMappingBean.services.serviceName', name: 'Service' },
    { prop: 'serviceMappingBean.servicePrice', name: 'Service Price' }
  ];
  actionButtons = [
    {
      type: `Info`,
      matTooltip: `${this.moduleKeyModel.taxMapping.name} Info`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `info`,
      dialogComponent: TaxServiceMappingDetailsComponent,
      hasPermission: this.permissionService.hasPermission('Info')
    },
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.taxMapping.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: TaxServiceMappingGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.taxMapping.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: TaxServiceMappingGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    }
  ];

  constructor(
    public permissionService: PermissionService,
    public initializeService: InitializeService,
    public headerService: HeaderService,
    public authService: AuthenticationService
  ) { }

  ngOnInit(): void {
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
  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
