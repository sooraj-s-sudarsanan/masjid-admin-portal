import { Component, OnInit } from '@angular/core';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { PermissionService } from 'src/app/core/services/permission.service';
import { CountryDeleteComponent } from '../country-delete/country-delete.component';
import { CountryGridActionComponent } from '../country-grid-action/country-grid-action.component';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {

  columns = [
    { prop: 'nationalityName', name: 'Nationality Name' },
    { prop: 'nationalityNameArb', name: 'Nationality Name Arb' },
    { prop: 'nationalityName', name: 'Name' },
    { prop: 'countryCode', name: 'Country Code' },
    { prop: 'currency', name: 'Currency' }
  ];

  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.countryModule.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: CountryGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    // {
    //   type: `Info`,
    //   matTooltip: `${this.moduleKeyModel.countryModule.name} Info`,
    //   matTooltipClass: `tooltip`,
    //   matTooltipPosition: `above`,
    //   color: `primary`,
    //   matIcon: `info`,
    //   dialogComponent: SubModuleDeleteComponent
    // },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.countryModule.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: CountryGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.countryModule.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: CountryDeleteComponent,
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
