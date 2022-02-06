import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoleModel } from '../core/model/role-model';
import { AuthenticationService } from '../core/services/authentication.service';
import { HeaderService } from '../core/services/header.service';
import { InitializeService } from '../core/services/initialize.service';
import { PermissionService } from '../core/services/permission.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  constructor(
    private permissionService: PermissionService,
    public initializeService: InitializeService,
    public headerService: HeaderService,
    public authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.headerService.toggleSpinner(true);
    this.subscriptions.push(this.initializeService.initializeCompleted$.subscribe((response) => {
  
      if (response) {
        this.headerService.toggleSpinner(false);
        if (this.authService.userInfo) {
          const userInfo = this.authService.userInfo;
          if (userInfo.userRole.roleName.toUpperCase() === RoleModel.merchantAdmin) {
            if (!userInfo.merchant) {
              this.authService.userIsValid = false;
            }
          } else if (userInfo.userRole.roleName.toUpperCase() === RoleModel.branchAdmin) {
            if (!userInfo.branch) {
              this.authService.userIsValid = false;
            }
          }
       
        }
      }
    }));
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
