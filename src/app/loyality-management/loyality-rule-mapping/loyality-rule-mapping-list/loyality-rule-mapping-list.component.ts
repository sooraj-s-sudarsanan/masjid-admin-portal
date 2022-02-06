import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { RoleModel } from 'src/app/core/model/role-model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { InitializeService } from 'src/app/core/services/initialize.service';
import { PermissionService } from 'src/app/core/services/permission.service';
import { ServicePersonFilterComponent } from 'src/app/service-person/service-person-filter/service-person-filter.component';
import { LoyalityRuleMappingDetailsComponent } from '../loyality-rule-mapping-details/loyality-rule-mapping-details.component';
import { LoyalityRuleMappingFilterComponent } from '../loyality-rule-mapping-filter/loyality-rule-mapping-filter.component';
import { LoyalityRuleMappingGridActionComponent } from '../loyality-rule-mapping-grid-action/loyality-rule-mapping-grid-action.component';

@Component({
  selector: 'app-loyality-rule-mapping-list',
  templateUrl: './loyality-rule-mapping-list.component.html',
  styleUrls: ['./loyality-rule-mapping-list.component.scss']
})
export class LoyalityRuleMappingListComponent implements OnInit {

  filterComponent: any = LoyalityRuleMappingFilterComponent;
  subscriptions: Subscription[] = [];
  userInfo: any;
  filter = null;
  @ViewChild('rewardPointApplicable', { static: true }) rewardPointApplicableTmplt: TemplateRef<any>;

  dialogSize = {
    width: '80%'
  };
  columns=[];
  actionButtons=[];
  
  constructor(
    public permissionService: PermissionService,
    public initializeService: InitializeService,
    public headerService: HeaderService,
    public authService: AuthenticationService
  ) {

    this.columns = [
      { prop: 'merchantName', name: 'Merchant Name' },
      { prop: 'branchName', name: 'Branch Name' },
      { prop: 'serviceName', name: 'Services Name' },
      { prop: 'loyaltyRule.loyaltyCode', name: 'Code' },
      { prop: 'rewardPointStartDate', name: 'Start Date' },
      { prop: 'rewardPointEndDate', name: 'End Date' },
      { prop: 'rewardPointApplicable', name: 'Point Applicable' },
      { prop: 'loyaltyRule.loyaltyType.loyaltyTypeName', name: 'Loyalty Type' }
    ];
    this.actionButtons = [
      {
        type: `New`,
        matTooltip: `New ${this.moduleKeyModel.loyalityRuleMapping.name}`,
        matTooltipClass: `tooltip`,
        matTooltipPosition: `above`,
        color: `primary`,
        matIcon: `add`,
        dialogComponent: LoyalityRuleMappingGridActionComponent,
        hasPermission: this.permissionService.hasPermission('New')
      },
      {
        type: `Info`,
        matTooltip: `${this.moduleKeyModel.loyalityRuleMapping.name} List`,
        matTooltipClass: `tooltip`,
        matTooltipPosition: `above`,
        color: `primary`,
        matIcon: `loyalty`,
        dialogComponent: LoyalityRuleMappingDetailsComponent,
        hasPermission: this.permissionService.hasPermission('Info')
      },
      {
        type: `Edit`,
        matTooltip: `${this.moduleKeyModel.loyalityRuleMapping.name} Edit`,
        matTooltipClass: `tooltip`,
        matTooltipPosition: `above`,
        color: `primary`,
        matIcon: `edit`,
        dialogComponent: LoyalityRuleMappingGridActionComponent,
        hasPermission: this.permissionService.hasPermission('Edit')
      }    
    ];

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
