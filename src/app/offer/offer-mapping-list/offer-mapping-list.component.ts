import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { RoleModel } from 'src/app/core/model/role-model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { InitializeService } from 'src/app/core/services/initialize.service';
import { PermissionService } from 'src/app/core/services/permission.service';
import { MappingFilterComponent } from 'src/app/mapping/mapping-filter/mapping-filter.component';
import { OfferMappingGridActionComponent } from '../offer-mapping-grid-action/offer-mapping-grid-action.component';

@Component({
  selector: 'app-offer-mapping-list',
  templateUrl: './offer-mapping-list.component.html',
  styleUrls: ['./offer-mapping-list.component.scss']
})
export class OfferMappingListComponent implements OnInit, OnDestroy {

  
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
    { prop: 'offers.offerName', name: 'Offer Name' },
    { prop: 'offers.offerStartDate', name: 'Start Date' },
    { prop: 'offers.offerEndDate', name: 'End Date' },
    { prop: 'offers.offerValue', name: 'Offer Value' }
  ];
  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.offerMapping.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: OfferMappingGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.offerMapping.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: OfferMappingGridActionComponent,
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
