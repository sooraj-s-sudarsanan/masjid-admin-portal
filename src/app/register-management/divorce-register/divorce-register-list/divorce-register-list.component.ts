import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { InitializeService } from 'src/app/core/services/initialize.service';
import { PermissionService } from 'src/app/core/services/permission.service';
import { DivorceRegisterDeleteComponent } from '../divorce-register-delete/divorce-register-delete.component';
import { DivorceRegisterDetailsComponent } from '../divorce-register-details/divorce-register-details.component';
import { DivorceRegisterGridActionComponent } from '../divorce-register-grid-action/divorce-register-grid-action.component';

@Component({
  selector: 'app-divorce-register-list',
  templateUrl: './divorce-register-list.component.html',
  styleUrls: ['./divorce-register-list.component.scss']
})
export class DivorceRegisterListComponent implements OnInit, OnDestroy {

  filterComponent: any = null;
  filter = null;
  subscriptions: Subscription[] = [];
  userInfo: any;

  columns = [
    { prop: 'family.familyName', name: 'Family' },
    { prop: 'divorcedDate', name: 'Divorced Date' },
    { prop: 'delegateName', name: 'Delegate Name' },
    { prop: 'witness1', name: 'Witness1' }   
  ];

  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.memberRegister.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: DivorceRegisterGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    {
      type: `Info`,
      matTooltip: `${this.moduleKeyModel.memberRegister.name} Info`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `info`,
      dialogComponent: DivorceRegisterDetailsComponent,
      hasPermission: this.permissionService.hasPermission('Info')
    },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.memberRegister.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: DivorceRegisterGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.memberRegister.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: DivorceRegisterDeleteComponent,
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
