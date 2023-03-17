import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { InitializeService } from 'src/app/core/services/initialize.service';
import { PermissionService } from 'src/app/core/services/permission.service';
import { HouseRegisterDeleteComponent } from '../house-register-delete/house-register-delete.component';
import { HouseRegisterDetailsComponent } from '../house-register-details/house-register-details.component';
import { HouseRegisterGridActionComponent } from '../house-register-grid-action/house-register-grid-action.component';

@Component({
  selector: 'app-house-register-list',
  templateUrl: './house-register-list.component.html',
  styleUrls: ['./house-register-list.component.scss']
})
export class HouseRegisterListComponent implements OnInit, OnDestroy {


  filterComponent: any = null;
  filter = null;
  subscriptions: Subscription[] = [];
  userInfo: any;

  columns = [
    { prop: 'houseNo', name: 'No' },
    { prop: 'houseName', name: 'Name' },
    { prop: 'houseMobileNo', name: 'Mobile No' },
    { prop: 'family.familyName', name: 'Family' },
    { prop: 'member.fatherName', name: 'Member' },
    { prop: 'area', name: 'Area' },
  
  ];

  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.houseRegister.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: HouseRegisterGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    {
      type: `Info`,
      matTooltip: `${this.moduleKeyModel.houseRegister.name} Info`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `info`,
      dialogComponent: HouseRegisterDetailsComponent,
      hasPermission: this.permissionService.hasPermission('Info')
    },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.houseRegister.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: HouseRegisterGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.houseRegister.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: HouseRegisterDeleteComponent,
      hasPermission: this.permissionService.hasPermission('Delete')
    }
  ];
  constructor(
    private permissionService: PermissionService,
    public initializeService: InitializeService,
    public headerService: HeaderService,
    public authService: AuthenticationService
  ) {

    this.headerService.toggleSpinner(true);
    this.subscriptions.push(this.initializeService.initializeCompleted$.subscribe((response) => {
      if (response) {
        this.headerService.toggleSpinner(false);

      }
    }));
  }

  ngOnInit(): void {
  }

  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
