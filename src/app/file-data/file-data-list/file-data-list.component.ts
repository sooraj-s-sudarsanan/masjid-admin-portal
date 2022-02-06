import { Component, OnInit } from '@angular/core';
import { FileDataGridActionComponent } from '../file-data-grid-action/file-data-grid-action.component';
import { FileDataDetailsComponent } from '../file-data-details/file-data-details.component';
import { FileDataDeleteComponent } from '../file-data-delete/file-data-delete.component';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { PermissionService } from 'src/app/core/services/permission.service';
import { FileDataFilterComponent } from '../file-data-filter/file-data-filter.component';

@Component({
  selector: 'app-file-data-list',
  templateUrl: './file-data-list.component.html',
  styleUrls: ['./file-data-list.component.scss']
})
export class FileDataListComponent implements OnInit {

  filterComponent: any = FileDataFilterComponent;
  columns = [
    // { prop: 'fileIconCss', name: 'File Icon CSS' },
    { prop: 'fileName', name: 'File Name' },
    { prop: 'fileCategory', name: 'File Category' }
  ];
  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.fileData.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: FileDataGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    {
      type: `Info`,
      matTooltip: `${this.moduleKeyModel.fileData.name} info`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `info`,
      dialogComponent: FileDataDetailsComponent,
      hasPermission: this.permissionService.hasPermission('View')
    },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.fileData.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: FileDataGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.fileData.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: FileDataDeleteComponent,
      hasPermission: this.permissionService.hasPermission('Delete')
    }
  ];
  constructor(
    public permissionService: PermissionService
  ) { }

  ngOnInit() {
  }

  get moduleKeyModel() {
    return ModuleKeyModel;
  }

}
