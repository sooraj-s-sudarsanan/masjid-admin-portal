import { Component, OnInit } from '@angular/core';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { PermissionService } from 'src/app/core/services/permission.service';
import { TaxTypeDeleteComponent } from '../tax-type-delete/tax-type-delete.component';
import { TaxTypeGridActionComponent } from '../tax-type-grid-action/tax-type-grid-action.component';

@Component({
  selector: 'app-tax-type-list',
  templateUrl: './tax-type-list.component.html',
  styleUrls: ['./tax-type-list.component.scss']
})
export class TaxTypeListComponent implements OnInit {

  columns = [
    { prop: 'taxTypeName', name: 'Name' },
    { prop: 'taxTypeCode', name: 'Code' },
    { prop: 'taxTypeCountryCode', name: 'Country' }
  ];
  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.roleManagement.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: TaxTypeGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },   
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.roleManagement.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: TaxTypeGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.roleManagement.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: TaxTypeDeleteComponent,
      hasPermission: this.permissionService.hasPermission('Delete')
    }   
  ];

  constructor(
    public permissionService: PermissionService
  ) { }

  ngOnInit(): void {   
  }
  public get moduleKeyModel(): any {
    return ModuleKeyModel;
  }
}
