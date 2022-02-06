import { Component, OnInit } from '@angular/core';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { PermissionService } from 'src/app/core/services/permission.service';
import { TaxComponentsDeleteComponent } from '../tax-components-delete/tax-components-delete.component';
import { TaxComponentsGridActionComponent } from '../tax-components-grid-action/tax-components-grid-action.component';

@Component({
  selector: 'app-tax-components-list',
  templateUrl: './tax-components-list.component.html',
  styleUrls: ['./tax-components-list.component.scss']
})
export class TaxComponentsListComponent implements OnInit {

  columns = [
    { prop: 'taxType.taxTypeName', name: 'Tax Type' },
    { prop: 'taxComponentName', name: 'Component' },
    { prop: 'taxComponentCode', name: 'Code' },
    { prop: 'taxRate', name: 'Tax Rate' }
  ];
  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.taxComponents.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: TaxComponentsGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },   
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.taxComponents.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: TaxComponentsGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.taxComponents.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: TaxComponentsDeleteComponent,
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
