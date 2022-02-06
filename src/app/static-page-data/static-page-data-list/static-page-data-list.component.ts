import { Component, OnInit } from '@angular/core';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { PermissionService } from 'src/app/core/services/permission.service';
import { StaticPageDataDeleteComponent } from '../static-page-data-delete/static-page-data-delete.component';
import { StaticPageDataDetailsComponent } from '../static-page-data-details/static-page-data-details.component';
import { StaticPageDataGridActionComponent } from '../static-page-data-grid-action/static-page-data-grid-action.component';

@Component({
  selector: 'app-static-page-data-list',
  templateUrl: './static-page-data-list.component.html',
  styleUrls: ['./static-page-data-list.component.scss']
})
export class StaticPageDataListComponent implements OnInit {

  columns = [
    { prop: 'staticPageName.staticPageName', name: 'Page Name' }
  ];

  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.pageData.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: StaticPageDataGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    {
      type: `Info`,
      matTooltip: `${this.moduleKeyModel.module.name} Info`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `info`,
      dialogComponent: StaticPageDataDetailsComponent,
      hasPermission: this.permissionService.hasPermission('Info')
    },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.pageData.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: StaticPageDataGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.pageData.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: StaticPageDataDeleteComponent,
      hasPermission: this.permissionService.hasPermission('Delete')
    }
  ];

  dialogSize = {
    width: '800px',
    height: '600px'
  };
  constructor(
    public permissionService: PermissionService
  ) { }

  ngOnInit(): void {
  }
  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }
}
