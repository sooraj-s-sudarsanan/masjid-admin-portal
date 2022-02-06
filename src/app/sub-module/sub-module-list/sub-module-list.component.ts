import { Component, OnInit } from '@angular/core';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { PermissionService } from 'src/app/core/services/permission.service';
import { SubModuleDeleteComponent } from '../sub-module-delete/sub-module-delete.component';
import { SubModuleFilterComponent } from '../sub-module-filter/sub-module-filter.component';
import { SubModuleGridActionComponent } from '../sub-module-grid-action/sub-module-grid-action.component';

@Component({
  selector: 'app-sub-module-list',
  templateUrl: './sub-module-list.component.html',
  styleUrls: ['./sub-module-list.component.scss']
})
export class SubModuleListComponent implements OnInit {

  filterComponent: any = SubModuleFilterComponent;
  columns = [
    { prop: 'submoduleName', name: 'Sub Module' },
    { prop: 'submoduleUrl', name: 'URL' },
    { prop: 'modules.moduleName', name: 'Module' },
    { prop: 'submoduleSortOrder', name: 'SortOrder' },
    { prop: 'submoduleUrl', name: 'Url' }
  ];

  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.subModule.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: SubModuleGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    // {
    //   type: `Info`,
    //   matTooltip: `${this.moduleKeyModel.subModule.name} Info`,
    //   matTooltipClass: `tooltip`,
    //   matTooltipPosition: `above`,
    //   color: `primary`,
    //   matIcon: `info`,
    //   dialogComponent: SubModuleDeleteComponent,
    //   hasPermission: this.permissionService.hasPermission('Info')
    // },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.subModule.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: SubModuleGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.subModule.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: SubModuleDeleteComponent,
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
