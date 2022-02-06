import { Component, OnInit } from '@angular/core';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { MenuManagementDeleteComponent } from '../menu-management-delete/menu-management-delete.component';
import { MenuManagementDetailsComponent } from '../menu-management-details/menu-management-details.component';
import { MenuManagementGridActionComponent } from '../menu-management-grid-action/menu-management-grid-action.component';

@Component({
  selector: 'app-menu-management-list',
  templateUrl: './menu-management-list.component.html',
  styleUrls: ['./menu-management-list.component.scss']
})
export class MenuManagementListComponent implements OnInit {
  [x: string]: any;


  columns = [
    { prop: 'menuName', name: 'Menu' },
    { prop: 'menuUrl', name: 'Menu URL' },
    { prop: 'createdBy', name: 'Created By' }
  ];

  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.menuManagement.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: MenuManagementGridActionComponent
    },
    {
      type: `Info`,
      matTooltip: `${this.moduleKeyModel.menuManagement.name} Info`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `info`,
      dialogComponent: MenuManagementDetailsComponent
    },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.menuManagement.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: MenuManagementGridActionComponent
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.menuManagement.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: MenuManagementDeleteComponent
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }
  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }

}
