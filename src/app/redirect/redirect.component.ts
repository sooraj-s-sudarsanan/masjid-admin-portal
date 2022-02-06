import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalStoragekeysModel } from '../core/model/local-storagekeys-model';
import { ResponseStatusModel } from '../core/model/response-status-model';
import { AdminBaseService } from '../core/services/admin-base.service';
import { AuthenticationService } from '../core/services/authentication.service';
import { CommonService } from '../core/services/common.service';
import { HeaderService } from '../core/services/header.service';
import { InitializeService } from '../core/services/initialize.service';
import { LocalStorageService } from '../core/services/local-storage.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit, OnDestroy {
  token: any;
  userId: any;
  roleId: any;
  subscriptions: Subscription[] = [];
  deviceId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private authService: AuthenticationService,
    private localStorageService: LocalStorageService,
    public initializeService: InitializeService,
    public commonService: CommonService,
    private adminBaseService: AdminBaseService) {

  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get("token");
    this.userId = this.route.snapshot.paramMap.get("userId");
    this.roleId = this.route.snapshot.paramMap.get("roleId");
    this.deviceId = this.route.snapshot.paramMap.get("deviceId");   
    
    this.headerService.toggleSpinner(true);

    if (this.userId && this.roleId && this.token && this.deviceId) {
      const encDevInfo = JSON.parse(this.localStorageService.read(LocalStoragekeysModel.devInfo, true));
      if (encDevInfo) {
        encDevInfo.ID.value = this.deviceId;
        this.localStorageService.create(LocalStoragekeysModel.devInfo, JSON.stringify(encDevInfo), true);
      }

      // Get Admin User info
      const userInfo = {
        userId: this.userId
      };
      this.adminBaseService.requestSubmit('ADM_GET_ADMINUSER_BYID', userInfo, this.token).subscribe(user => {
        if (user) {
          if (user.result) {
            if (user.result.status === ResponseStatusModel.SUCCESS) {

              user.result.data.fullName = this.commonService.decryptor(user.result.data.fullName);
              user.result.data.mobileNo = this.commonService.decryptor(user.result.data.mobileNo);
              user.result.data.email = this.commonService.decryptor(user.result.data.email);

              this.authService.userInfo = user.result.data;

              this.localStorageService.create(LocalStoragekeysModel.adminId, user.result.data.userId, true);
              this.localStorageService.create(LocalStoragekeysModel.adminRefreshToken, null, false);
              this.localStorageService.create(LocalStoragekeysModel.adminToken, this.token, false);
              this.localStorageService.create(LocalStoragekeysModel.roleId, this.roleId, true);

              this.authService.isLoggedIn$.next(true);
              this.router.navigate(['/Dashboard']);
            } else {
              //this.isLoggedIn = false;
              this.authService.isLoggedIn$.next(false);
              this.authService.clearLoggedInfo();
              this.authService.isSessionTimeOut$.next(true);
              this.headerService.toggleSpinner(false);
            }
          }
        }
      });

    }

  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
