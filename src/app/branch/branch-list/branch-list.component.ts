import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { RoleModel } from 'src/app/core/model/role-model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { InitializeService } from 'src/app/core/services/initialize.service';
import { PermissionService } from 'src/app/core/services/permission.service';
import { AddFileComponent } from '../add-file/add-file.component';
import { BranchDeleteComponent } from '../branch-delete/branch-delete.component';
import { BranchDetailsComponent } from '../branch-details/branch-details.component';
import { BranchFilterComponent } from '../branch-filter/branch-filter.component';
import { BranchGridActionComponent } from '../branch-grid-action/branch-grid-action.component';
import { WeblinkComponent } from '../weblink/weblink.component';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.scss']
})
export class BranchListComponent implements OnInit, OnDestroy {

  filterComponent: any = BranchFilterComponent;

  columns = [
    { prop: 'branchName', name: 'Branch Name' },
    { prop: 'branchNameAR', name: 'Branch Name AR' },
    { prop: 'merchantBean.merchantName', name: 'Merchant Name' }
  ];

  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.branch.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: BranchGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    {
      type: `Info`,
      matTooltip: `${this.moduleKeyModel.branch.name} Info`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `info`,
      dialogComponent: BranchDetailsComponent,
      hasPermission: this.permissionService.hasPermission('Info')
    },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.branch.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: BranchGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.branch.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: BranchDeleteComponent,
      hasPermission: this.permissionService.hasPermission('Delete')
    },
    {
      type: `Edit`,
      matTooltip: `upload ${this.moduleKeyModel.branch.name} image`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add_a_photo`,
      dialogComponent: AddFileComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Edit`,
      matTooltip: `Web Link`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `http`,
      dialogComponent: WeblinkComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    }
  ];

  subscriptions: Subscription[] = [];
  userInfo: any;
  filter = null;

  constructor(
    public permissionService: PermissionService,
    public initializeService: InitializeService,
    public headerService: HeaderService,
    public authService: AuthenticationService
  ) {
    this.headerService.toggleSpinner(true);
    this.subscriptions.push(this.initializeService.initializeCompleted$.subscribe((response) => {
      if (response) {
        this.headerService.toggleSpinner(false);
        if (this.authService.userInfo) {
          this.userInfo = this.authService.userInfo;
          if (this.userInfo.userRole.roleName.toUpperCase() === RoleModel.merchantAdmin) {
            this.filterComponent = null;
            this.filter = `merchantBean.merchantId==${this.userInfo.merchant.merchantId}`;
          } else if (this.userInfo.userRole.roleName.toUpperCase() === RoleModel.branchAdmin) {
            this.filterComponent = null;
            this.filter = `merchantBean.merchantId==${this.userInfo.merchant.merchantId}`;
          }
        }
      }
    }));
  }

  dialogSize = {
    width: '800px',
    height: 'auto'
  };

  ngOnInit(): void {
  }

  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
