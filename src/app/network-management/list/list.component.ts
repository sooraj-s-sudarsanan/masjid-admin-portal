import { Component, OnInit } from '@angular/core';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { InitializeService } from 'src/app/core/services/initialize.service';
import { GridActionComponent } from '../grid-action/grid-action.component';
import { DetailsComponent } from '../details/details.component';
import { DeleteComponent } from '../delete/delete.component';
import { PermissionService } from 'src/app/core/services/permission.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  // Columns
  columns = [
    { prop: 'networkName', name: 'Network Name' },
    { prop: 'networkNameAR', name: 'Network Name AR' },
    { prop: 'networkDescription', name: 'Network Description' },
    { prop: 'networkDescriptionAR', name: 'Network Description AR' }
  ];
  // Buttons
  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${ModuleKeyModel.networkManagement.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: GridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    {
      type: `Info`,
      matTooltip: `${ModuleKeyModel.networkManagement.name} Info`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `info`,
      dialogComponent: DetailsComponent,
      hasPermission: this.permissionService.hasPermission('Info')
    },
    {
      type: `Edit`,
      matTooltip: `${ModuleKeyModel.networkManagement.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: GridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${ModuleKeyModel.networkManagement.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: DeleteComponent,
      hasPermission: this.permissionService.hasPermission('Delete')
    }
  ];

  constructor(
    private initializeService: InitializeService,
    public permissionService: PermissionService
  ) { }

  ngOnInit(): void {
  }

  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }
}
