import { Component, OnInit } from '@angular/core';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { PermissionService } from 'src/app/core/services/permission.service';
import { LocalityDeleteComponent } from '../locality-delete/locality-delete.component';
import { LocalityGridActionComponent } from '../locality-grid-action/locality-grid-action.component';

@Component({
  selector: 'app-locality-list',
  templateUrl: './locality-list.component.html',
  styleUrls: ['./locality-list.component.scss']
})
export class LocalityListComponent implements OnInit {

  columns = [
    { prop: 'localityName', name: 'Locality Name' },
    { prop: 'localityNameAR', name: 'Locality Name AR' },
    { prop: 'localityCode', name: 'Locality Code' },
    { prop: 'nationalityBean.nationalityName', name: 'Country' }
  ];
  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.localityModule.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: LocalityGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    // {
    //   type: `Info`,
    //   matTooltip: `${this.moduleKeyModel.localityModule.name} Info`,
    //   matTooltipClass: `tooltip`,
    //   matTooltipPosition: `above`,
    //   color: `primary`,
    //   matIcon: `info`,
    //   dialogComponent: SubModuleDeleteComponent
    // },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.localityModule.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: LocalityGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.localityModule.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: LocalityDeleteComponent,
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
