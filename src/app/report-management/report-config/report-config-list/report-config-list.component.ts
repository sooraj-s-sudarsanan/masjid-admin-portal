import { Component, OnInit } from '@angular/core';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { PermissionService } from 'src/app/core/services/permission.service';
import { ReportConfigDeleteComponent } from '../report-config-delete/report-config-delete.component';
import { ReportConfigDetailsComponent } from '../report-config-details/report-config-details.component';
import { ReportConfigFilterComponent } from '../report-config-filter/report-config-filter.component';
import { ReportConfigGridActionComponent } from '../report-config-grid-action/report-config-grid-action.component';

@Component({
  selector: 'app-report-config-list',
  templateUrl: './report-config-list.component.html',
  styleUrls: ['./report-config-list.component.scss']
})
export class ReportConfigListComponent implements OnInit {
  filterComponent: any = ReportConfigFilterComponent;
  columns = [
    { prop: 'merchantName', name: 'Merchant' },
    { prop: 'branchName', name: 'Branch' },
    { prop: 'reportType.reportTypeName', name: 'Report' },
    { prop: 'reportEnbleStatus', name: 'Enabled' }

  ];

  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.reportConfig.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: ReportConfigGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },    
    // {
    //   type: `Info`,
    //   matTooltip: `${this.moduleKeyModel.reportConfig.name} Info`,
    //   matTooltipClass: `tooltip`,
    //   matTooltipPosition: `above`,
    //   color: `primary`,
    //   matIcon: `info`,
    //   dialogComponent: ReportConfigDetailsComponent,
    //   hasPermission: this.permissionService.hasPermission('Info')
    // },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.reportConfig.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: ReportConfigGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.reportConfig.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: ReportConfigDeleteComponent,
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
