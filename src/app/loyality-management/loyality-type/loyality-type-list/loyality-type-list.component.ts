import { Component, OnInit } from '@angular/core';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { PermissionService } from 'src/app/core/services/permission.service';
import { LoyalityTypeDeleteComponent } from '../loyality-type-delete/loyality-type-delete.component';
import { LoyalityTypeGridActionComponent } from '../loyality-type-grid-action/loyality-type-grid-action.component';

@Component({
  selector: 'app-loyality-type-list',
  templateUrl: './loyality-type-list.component.html',
  styleUrls: ['./loyality-type-list.component.scss']
})
export class LoyalityTypeListComponent implements OnInit {

  columns = [
    { prop: 'loyaltyTypeName', name: 'Type' },
    { prop: 'loyaltyTypeDesc', name: 'Description' }

  ];

  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.loyalityType.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: LoyalityTypeGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },    
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.loyalityType.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: LoyalityTypeGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.loyalityType.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: LoyalityTypeDeleteComponent,
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
