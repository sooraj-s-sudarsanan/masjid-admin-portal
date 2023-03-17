import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { InitializeService } from 'src/app/core/services/initialize.service';
import { PermissionService } from 'src/app/core/services/permission.service';
import { FamilyRegisterDeleteComponent } from '../family-register-delete/family-register-delete.component'
import { FamilyRegisterDetailsComponent } from '../family-register-details/family-register-details.component';
import { FamilyRegisterGridActionComponent } from '../family-register-grid-action/family-register-grid-action.component';

@Component({
  selector: 'app-family-register-list',
  templateUrl: './family-register-list.component.html',
  styleUrls: ['./family-register-list.component.scss']
})
export class FamilyRegisterListComponent implements OnInit {

  filterComponent: any = null;
  filter = null;
  subscriptions: Subscription[] = [];
  userInfo: any;

  columns = [
    { prop: 'familyNo', name: 'Family No' },
    { prop: 'familyName', name: 'Family Name' },
    { prop: 'phone', name: 'Phone' },
    { prop: 'registerMaster.registerName', name: 'Register Master' }
  ];

  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.familyRegister.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: FamilyRegisterGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    {
      type: `Info`,
      matTooltip: `${this.moduleKeyModel.familyRegister.name} Info`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `info`,
      dialogComponent: FamilyRegisterDetailsComponent,
      hasPermission: this.permissionService.hasPermission('Info')
    },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.familyRegister.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: FamilyRegisterGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.familyRegister.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: FamilyRegisterDeleteComponent,
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
