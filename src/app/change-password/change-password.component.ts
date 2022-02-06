import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ResponseStatusModel } from '../core/model/response-status-model';
import { AdminBaseService } from '../core/services/admin-base.service';
import { AlertService } from '../core/services/alert.service';
import { AuthenticationService } from '../core/services/authentication.service';
import { CommonService } from '../core/services/common.service';
import { HeaderService } from '../core/services/header.service';
import { InitializeService } from '../core/services/initialize.service';
import { ConfirmedValidator } from '../core/validator/confirmed.validator';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  passwordForm: FormGroup;
  subscriptions: Subscription[] = [];
  pageName = null;
  pswdPolicy = '^((?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@.$!%*?&])[A-Za-z\\d@.$!%*?&]{8,50})$';


  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private formBuilder: FormBuilder,
    private initializeService: InitializeService,
    private adminBaseService: AdminBaseService,
    private alertService: AlertService,
    public authService: AuthenticationService,
    public headerService: HeaderService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.headerService.toggleSpinner(true);
    }, 100);
    this.passwordForm = this.formBuilder.group({
      userId: ['', [Validators.required]],
      oldPassword: ['', [Validators.required, Validators.maxLength(50)]],
      newPassword: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(this.pswdPolicy)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(this.pswdPolicy)]]
    }, {
      validator: ConfirmedValidator('newPassword', 'confirmPassword')
    });
    this.subscriptions.push(this.initializeService.initializeCompleted$.subscribe((response) => {
      if (response && this.authService.userInfo) {
        setTimeout(() => {
          this.headerService.toggleSpinner(false);
        }, 100);      
        this.passwordForm.get('userId').setValue(this.authService.userInfo.userId);
      }
    }));
  }
  get eform(): any { return this.passwordForm.controls; }

  public onSubmitForm(): any {
 
    if (this.passwordForm.invalid) {
      return false;
    }
    this.headerService.toggleSpinner(true);
    const requestBody = Object.assign({}, this.passwordForm.value);
    requestBody.oldPassword = this.commonService.encrypt(requestBody.oldPassword);
    requestBody.newPassword = this.commonService.encrypt(requestBody.newPassword);
    requestBody.confirmPassword = this.commonService.encrypt(requestBody.confirmPassword);
    this.subscriptions.push(this.adminBaseService
      .requestSubmit('ADM_CHANGE_ADMIN_PASSWORD', requestBody).subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === ResponseStatusModel.SUCCESS) {
              setTimeout(() => {
                this.alertService.open(ResponseStatusModel.SUCCESS, 'Password updated successfully.');
              }, 100);
              this.dialogRef.close();
            } else {
              this.alertService.open(ResponseStatusModel.ERROR, response.result.errorMessage);
            }
          }
        }
        this.headerService.toggleSpinner(false);
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
