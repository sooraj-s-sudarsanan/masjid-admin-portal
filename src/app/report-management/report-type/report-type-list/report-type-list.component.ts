import { Component, OnInit } from '@angular/core';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { PermissionService } from 'src/app/core/services/permission.service';
import { ReportTypeDeleteComponent } from '../report-type-delete/report-type-delete.component';
import { ReportTypeGridActionComponent } from '../report-type-grid-action/report-type-grid-action.component';

@Component({
  selector: 'app-report-type-list',
  templateUrl: './report-type-list.component.html',
  styleUrls: ['./report-type-list.component.scss']
})
export class ReportTypeListComponent implements OnInit {

  columns = [
    { prop: 'reportTypeName', name: 'Report' },
    { prop: 'reportTypeCode', name: 'Code' },
    { prop: 'reportTypeDesc', name: 'Description' }
  ];
  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.reportType.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: ReportTypeGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },   
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.reportType.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: ReportTypeGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.reportType.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: ReportTypeDeleteComponent,
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
