import { Component, OnInit } from '@angular/core';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { PermissionService } from 'src/app/core/services/permission.service';
import { LoyalitySchemeDeleteComponent } from '../loyality-scheme-delete/loyality-scheme-delete.component';
import { LoyalitySchemeGridActionComponent } from '../loyality-scheme-grid-action/loyality-scheme-grid-action.component';


@Component({
  selector: 'app-loyality-scheme-list',
  templateUrl: './loyality-scheme-list.component.html',
  styleUrls: ['./loyality-scheme-list.component.scss']
})
export class LoyalitySchemeListComponent implements OnInit {

  columns = [
    { prop: 'loyaltySchemeName', name: 'Scheme' },
    { prop: 'loyaltySchemeDesc', name: 'Description' }

  ];

  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.loyalityScheme.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: LoyalitySchemeGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },    
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.loyalityScheme.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: LoyalitySchemeGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.loyalityScheme.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: LoyalitySchemeDeleteComponent,
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
