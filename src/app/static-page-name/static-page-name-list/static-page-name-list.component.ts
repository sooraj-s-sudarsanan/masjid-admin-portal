import { Component, OnInit } from '@angular/core';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { PermissionService } from 'src/app/core/services/permission.service';
import { StaticPageNameDeleteComponent } from '../static-page-name-delete/static-page-name-delete.component';
import { StaticPageNameGridActionComponent } from '../static-page-name-grid-action/static-page-name-grid-action.component';

@Component({
  selector: 'app-static-page-name-list',
  templateUrl: './static-page-name-list.component.html',
  styleUrls: ['./static-page-name-list.component.scss']
})
export class StaticPageNameListComponent implements OnInit {


  columns = [
    { prop: 'staticPageName', name: 'Page Name' },
    { prop: 'staticPageNameArb', name: 'Page Name Arb' }
  ];

  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.pageName.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: StaticPageNameGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    // {
    //   type: `Info`,
    //   matTooltip: `${this.moduleKeyModel.module.name} Info`,
    //   matTooltipClass: `tooltip`,
    //   matTooltipPosition: `above`,
    //   color: `primary`,
    //   matIcon: `info`,
    //   dialogComponent: SubModuleDeleteComponent
    //    hasPermission: this.permissionService.hasPermission('Info')
    // },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.pageName.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: StaticPageNameGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.pageName.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: StaticPageNameDeleteComponent,
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
