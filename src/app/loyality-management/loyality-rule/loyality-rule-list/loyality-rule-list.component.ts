import { Component, OnInit } from '@angular/core';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { PermissionService } from 'src/app/core/services/permission.service';
import { LoyalityRuleDetailsComponent } from '../loyality-rule-details/loyality-rule-details.component';
import { LoyalityRuleDeleteComponent } from '../loyality-rule-delete/loyality-rule-delete.component';
import { LoyalityRuleGridActionComponent } from '../loyality-rule-grid-action/loyality-rule-grid-action.component';

@Component({
  selector: 'app-loyality-rule-list',
  templateUrl: './loyality-rule-list.component.html',
  styleUrls: ['./loyality-rule-list.component.scss']
})
export class LoyalityRuleListComponent implements OnInit {

  columns = [
    { prop: 'loyaltyRuleName', name: 'Name' },
    { prop: 'loyaltyCode', name: 'Code' },
    { prop: 'loyaltyType.loyaltyTypeName', name: 'Loyalty Type' },
    { prop: 'loyaltyScheme.loyaltySchemeName', name: 'Loyalty Scheme' }

  ];

  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.loyalityRule.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: LoyalityRuleGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },    
    {
      type: `Info`,
      matTooltip: `${this.moduleKeyModel.loyalityRule.name} Info`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `info`,
      dialogComponent: LoyalityRuleDetailsComponent,
      hasPermission: this.permissionService.hasPermission('Info')
    },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.loyalityRule.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: LoyalityRuleGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.loyalityRule.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: LoyalityRuleDeleteComponent,
      hasPermission: this.permissionService.hasPermission('Delete')
    }
  ];


  constructor(
    public permissionService: PermissionService
  ) { }

  ngOnInit(): void {
  }
  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }

}
