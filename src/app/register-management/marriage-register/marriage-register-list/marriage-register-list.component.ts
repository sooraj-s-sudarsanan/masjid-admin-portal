import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { InitializeService } from 'src/app/core/services/initialize.service';
import { PermissionService } from 'src/app/core/services/permission.service';
import { MarriageRegisterDeleteComponent } from '../marriage-register-delete/marriage-register-delete.component';
import { MarriageRegisterDetailsComponent } from '../marriage-register-details/marriage-register-details.component';
import { MarriageRegisterGridActionComponent } from '../marriage-register-grid-action/marriage-register-grid-action.component';

@Component({
  selector: 'app-marriage-register-list',
  templateUrl: './marriage-register-list.component.html',
  styleUrls: ['./marriage-register-list.component.scss']
})
export class MarriageRegisterListComponent implements OnInit, OnDestroy {

  filterComponent: any = null;
  filter = null;
  subscriptions: Subscription[] = [];
  userInfo: any;

  columns = [
    { prop: 'brideFirstName', name: 'Bride FirstName' },
    { prop: 'brideFatherName', name: 'Bride FatherName' },
    { prop: 'groomFirstName', name: 'Groom FirstName' },
    { prop: 'groomFather', name: 'Groom Father' },
    { prop: 'family.familyName', name: 'Family' },
    { prop: 'member.fatherName', name: 'Member' },
  
  ];

  actionButtons = [
    {
      type: `New`,
      matTooltip: `New ${this.moduleKeyModel.marriageRegister.name}`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `add`,
      dialogComponent: MarriageRegisterGridActionComponent,
      hasPermission: this.permissionService.hasPermission('New')
    },
    {
      type: `Info`,
      matTooltip: `${this.moduleKeyModel.marriageRegister.name} Info`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `info`,
      dialogComponent: MarriageRegisterDetailsComponent,
      hasPermission: this.permissionService.hasPermission('Info')
    },
    {
      type: `Edit`,
      matTooltip: `${this.moduleKeyModel.marriageRegister.name} Edit`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `primary`,
      matIcon: `edit`,
      dialogComponent: MarriageRegisterGridActionComponent,
      hasPermission: this.permissionService.hasPermission('Edit')
    },
    {
      type: `Delete`,
      matTooltip: `${this.moduleKeyModel.marriageRegister.name} Delete`,
      matTooltipClass: `tooltip`,
      matTooltipPosition: `above`,
      color: `warn`,
      matIcon: `delete`,
      dialogComponent: MarriageRegisterDeleteComponent,
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
