import {
  OnInit,
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LocalStorageService } from './core/services/local-storage.service';
import { LocalStoragekeysModel } from './core/model/local-storagekeys-model';
import { Guid } from 'guid-typescript';
import { Router } from '@angular/router';
import { HeaderService } from './core/services/header.service';
import { InitializeService } from './core/services/initialize.service';
import { AuthenticationService } from './core/services/authentication.service';
import { AlertService } from './core/services/alert.service';
import { ResponseStatusModel } from './core/model/response-status-model';
import { RoleService } from './core/services/role.service';
import { PermissionService } from './core/services/permission.service';
import { ModuleKeyModel } from './core/model/module-key-model';
import { AdminBaseService } from './core/services/admin-base.service';
import { CommonService } from './core/services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { ForceChangePasswordComponent } from './force-change-password/force-change-password.component';
import { TermAndConditionModalComponent } from './merchant/term-and-condition-modal/term-and-condition-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('sidenav', { static: false }) sidenavRef: ElementRef;
  title = 'Q Booking';
  showSpinner = false;
  navItems = [];
  isLoggedIn = false;
  signInForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private headerService: HeaderService,
    public initializeService: InitializeService,
    private changeDetectorRef: ChangeDetectorRef,
    private alertService: AlertService,
    public authService: AuthenticationService,
    public formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private adminBaseService: AdminBaseService,
    public commonService: CommonService
  ) {
    // check test device id is exist in localstorage
    if (this.localStorageService.read(LocalStoragekeysModel.devInfo, true) == null) {
      // Create device info
      const deviceInfo = {
        ID: Guid.create()
      };
      this.localStorageService.create(LocalStoragekeysModel.devInfo, JSON.stringify(deviceInfo), true);
    }
  }
  ngOnInit(): void {

    this.signInForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.maxLength(15)]],
      latitude: [''],
      longitude: ['']
    });

    this.headerService.toggleSpinner(true);
    const userId = this.localStorageService.read(LocalStoragekeysModel.adminId, true);
    let roleId = this.localStorageService.read(LocalStoragekeysModel.roleId, true);
    if (userId && roleId) {
      // Get Admin User info
      const userInfo = {
        userId
      };
      this.adminBaseService.requestSubmit('ADM_GET_ADMINUSER_BYID', userInfo).subscribe(user => {
        if (user) {
          if (user.result) {
            if (user.result.status === ResponseStatusModel.SUCCESS) {

              user.result.data.fullName = this.commonService.decryptor(user.result.data.fullName);
              user.result.data.mobileNo = this.commonService.decryptor(user.result.data.mobileNo);
              user.result.data.email = this.commonService.decryptor(user.result.data.email);

              this.authService.userInfo = user.result.data;
              this.authService.isLoggedIn$.next(true);
              if (user.result.data.changePassword === 'true') {
                const actionDialogRef = this.dialog.open(ForceChangePasswordComponent, {
                  disableClose: true
                });
              } else if (user.result.data.userRole.roleName == 'Merchant Admin') {
                if (user.result.data.merchant) {
                  if (!user.result.data.merchant.termsAndCondition) {
                    const actionDialogRef = this.dialog.open(TermAndConditionModalComponent, {
                      disableClose: true,
                      width:'700px',
                      data: { data: user.result.data.merchant }
                    });
                  }
                }
              }
            } else {
              this.isLoggedIn = false;
              this.authService.isLoggedIn$.next(false);
              this.authService.clearLoggedInfo();
              this.authService.isSessionTimeOut$.next(true);
            }
          }
        }
      });


    } else {
      this.isLoggedIn = false;
      this.authService.isLoggedIn$.next(false);
      this.authService.clearLoggedInfo();
      // this.authService.isSessionTimeOut$.next(true);
    }


    this.authService.isLoggedIn$.subscribe(response => {

      roleId = this.localStorageService.read(LocalStoragekeysModel.roleId, true);
      if (response && roleId) {
        // Get role permission wise access module
        const params = {
          roleId
        };
        this.roleService.viewRole(params).subscribe((roleResp) => {
          if (roleResp) {
            if (roleResp.result) {
              if (roleResp.result.status === ResponseStatusModel.SUCCESS) {
                if (roleResp.result.data) {
                  this.navItems = [];
                  roleResp.result.data.forEach(module => {
                    const moduleObj = {
                      displayName: module.moduleName,
                      iconName: module.moduleCSSLink ? module.moduleCSSLink : 'settings',
                      route: '',
                      children: []
                    };
                    module.subModules.forEach(subModule => {
                      if (subModule.permissionAssigned.hasViewPermission) {
                        moduleObj.children.push({
                          displayName: subModule.submoduleName,
                          iconName: subModule.subModuleCSSLink ? subModule.subModuleCSSLink : 'settings',
                          route: subModule.submoduleUrl,
                          children: [],
                          hasCreatePermission: subModule.permissionAssigned.hasCreatePermission,
                          hasDeletePermission: subModule.permissionAssigned.hasDeletePermission,
                          hasUpdatePermission: subModule.permissionAssigned.hasUpdatePermission,
                          hasViewPermission: subModule.permissionAssigned.hasViewPermission
                        });
                      }
                    });
                    this.navItems.push(moduleObj);
                  });
                  this.permissionService.permissionModuleList = this.navItems;
                  // if (roleResp.result.data.permissions) {
                  //   this.permissionService.permissionModuleList = roleResp.result.data.permissions;

                  //   this.navItems = this.permissionService.manageMenuList(); // SidebarNavigationModel.navItems;
                  // }
                }
                this.initializeService.initializeCompleted$.next(true);
                this.isLoggedIn = true;
                this.headerService.toggleSpinner(false);
                this.router.navigate(['Dashboard']);
              }
            }
          }
        });
      } else if (response === false) {
        this.navItems = [];
        this.isLoggedIn = false;
        if (window.location.href.indexOf('redirect') == -1) {
          this.initServiceCall();
        }
      }
    });

    // Session TimeOut
    this.authService.isSessionTimeOut$.subscribe((response) => {

      if (response) {
        this.router.navigate(['login']);
        // this.alertService.open(ResponseStatusModel.ERROR, 'Session TimeOut');
        this.authService.publicTokenTimeOut();
        this.isLoggedIn = false;
        this.initServiceCall();
      }
    });
  }

  initServiceCall(): void {

    this.headerService.toggleSpinner(true);
    this.initializeService.Init().subscribe((response) => {
      if (response.status === ResponseStatusModel.SUCCESS) {
        this.localStorageService.create(LocalStoragekeysModel.adminToken, response.data.token);
        this.localStorageService.create(LocalStoragekeysModel.adminRefreshToken, response.data.tokenId);
        this.initializeService.initializeCompleted$.next(true);
        this.localStorageService.create(LocalStoragekeysModel.encKey, response.data.encryptionKey);
        this.headerService.toggleSpinner(false);
      } else {
        this.alertService.open(ResponseStatusModel.ERROR, 'App Initialization failed, please try again some times');
      }
    }, (error: any) => {
      this.alertService.open(ResponseStatusModel.ERROR, 'App Initialization failed, please try again some times');
    });

  }

  ngAfterViewInit(): void {

    this.headerService.sideNav = this.sidenavRef;
    this.headerService.showSpinner$.subscribe((response) => {
      this.showSpinner = response;
      this.changeDetectorRef.detectChanges();
    });

  }
}
