import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookingStatusTextModel } from 'src/app/core/model/common-model';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { RoleModel } from 'src/app/core/model/role-model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { InitializeService } from 'src/app/core/services/initialize.service';
import { PermissionService } from 'src/app/core/services/permission.service';
import { MappingFilterComponent } from 'src/app/mapping/mapping-filter/mapping-filter.component';
import { OfferDeleteComponent } from '../offer-delete/offer-delete.component';
import { OfferDetailsComponent } from '../offer-details/offer-details.component';
import { OfferFilterComponent } from '../offer-filter/offer-filter.component';
import { OfferGridActionComponent } from '../offer-grid-action/offer-grid-action.component';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit, OnDestroy {

  filterComponent: any = OfferFilterComponent;
  columns = [
    { prop: 'offerName', name: 'Name' },
    { prop: 'offerType.offerTypeName', name: 'Type' },
    { prop: 'offerStartDate', name: 'Start Date' },
    { prop: 'offerEndDate', name: 'End Date' },
    { prop: 'offerValue', name: 'Offer Value' }
  ];

  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.offer.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: OfferGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },   
    {
      type: `Info`,
      matTooltip: `${this.moduleKeyModel.offer.name} Info`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `info`,
      dialogComponent: OfferDetailsComponent,
      hasPermission: this.permissionService.hasPermission('Info')
    },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.offer.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: OfferGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.offer.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: OfferDeleteComponent,
      hasPermission: this.permissionService.hasPermission('Delete')
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
            this.filter = `branch.merchantBean.merchantId==${this.userInfo.merchant.merchantId}`;
          }else if (this.userInfo.userRole.roleName.toUpperCase() === RoleModel.branchAdmin) {
            this.filter = `branch.merchantBean.merchantId==${this.userInfo.merchant.merchantId}`;
          }          
        }       
        this.headerService.toggleSpinner(false);
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
