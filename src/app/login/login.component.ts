import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { InitializeService } from '../core/services/initialize.service';
import { HeaderService } from '../core/services/header.service';
import { AuthenticationService } from '../core/services/authentication.service';
import { LocalStorageService } from '../core/services/local-storage.service';
import { LocalStoragekeysModel } from '../core/model/local-storagekeys-model';
import { Router } from '@angular/router';
import { CommonService } from '../core/services/common.service';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { ForceChangePasswordComponent } from '../force-change-password/force-change-password.component';
import { AlertService } from '../core/services/alert.service';
import { ResponseStatusModel } from '../core/model/response-status-model';
import { Subscription } from 'rxjs';
import { AdminBaseService } from '../core/services/admin-base.service';
import { TermAndConditionModalComponent } from '../merchant/term-and-condition-modal/term-and-condition-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  signInForm: FormGroup;
  partnerPageInfo: any;
  pswdPolicy = '^((?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@.$!%*?&])[A-Za-z\\d@.$!%*?&]{8,15})$';

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public formBuilder: FormBuilder,
    public initializeService: InitializeService,
    public headerService: HeaderService,
    private authService: AuthenticationService,
    private localStorageService: LocalStorageService,
    private commonService: CommonService,
    public alertService: AlertService,
    public adminBaseService: AdminBaseService
  ) { }

  ngOnInit() {

    this.signInForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      password: ['', [Validators.required]],
      latitude: [''],
      longitude: ['']
    });

    this.headerService.toggleSpinner(true);
    this.subscriptions.push(this.initializeService.initializeCompleted$.subscribe((response) => {
      if (response) {
       
      }
    }));

  }

  get frmSignIn(): any { return this.signInForm.controls; }

  onSubmitSignInForm(): any {

    if (this.signInForm.invalid) {
      return false;
    }
    const requestBody = Object.assign({}, this.signInForm.value);
    requestBody.username = this.commonService.encrypt(requestBody.username);
    requestBody.password = this.commonService.encrypt(requestBody.password);
    // this.authService.isLoggedIn$.next(true);
    this.subscriptions.push(this.authService.signIn(requestBody).subscribe((response) => {

      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            if (response.result.data) {

              this.localStorageService.create(LocalStoragekeysModel.adminToken, response.result.data.token);

              if (response.result.data.user) {

                response.result.data.user.fullName = this.commonService.decryptor(response.result.data.user.fullName);
                response.result.data.user.mobileNo = this.commonService.decryptor(response.result.data.user.mobileNo);
                response.result.data.user.email = this.commonService.decryptor(response.result.data.user.email);

                this.localStorageService.create(LocalStoragekeysModel.adminId, response.result.data.user.userId, true);
                this.localStorageService.create(LocalStoragekeysModel.adminRefreshToken, response.result.data.tokenId, false);
                this.localStorageService.create(LocalStoragekeysModel.adminToken, response.result.data.token, false);
                this.localStorageService.create(LocalStoragekeysModel.roleId, response.result.data.user.userRole.roleId, true);
                // Emit
                this.authService.userInfo = response.result.data.user;
                this.authService.isLoggedIn$.next(true);

                this.router.navigate(['/Dashboard']);

                if (response.result.data.user?.changePassword === 'true') {
                  const actionDialogRef = this.dialog.open(ForceChangePasswordComponent, {
                    disableClose: true
                  });
                } else if (response.result.data.role === 'Merchant Admin') {
                  if (response.result.data.user.merchant) {
                    if (!response.result.data.user.merchant.termsAndCondition) {
                      const actionDialogRef = this.dialog.open(TermAndConditionModalComponent, {
                        disableClose: true,
                        width:'700px',
                        data: { data: response.result.data.user.merchant }
                      });
                    }
                  }
                }

              }
            }
          } else {
            if (response.result.errorMessage) {
              this.alertService.open(ResponseStatusModel.ERROR, response.result.errorMessage);
            } else {
              this.alertService.open(ResponseStatusModel.ERROR, 'Invalid user name or password');
            }
          }
        }
      }
    },
      (error: any) => {
        console.log(error);
      }));

  }

  forgotPassword($event): any {
    const actionDialogRef = this.dialog.open(ForgotPasswordComponent, {
      disableClose: true,
      width: '500px'
    });

    this.subscriptions.push(actionDialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
