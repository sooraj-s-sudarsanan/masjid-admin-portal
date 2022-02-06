import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ResponseStatusModel } from '../core/model/response-status-model';
import { AdminBaseService } from '../core/services/admin-base.service';
import { AlertService } from '../core/services/alert.service';
import { CommonService } from '../core/services/common.service';
import { HeaderService } from '../core/services/header.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  forgotPswdForm: FormGroup;
  subscriptions: Subscription[] = [];
  pswdPolicy = '^((?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@.$!%*?&])[A-Za-z\\d@.$!%*?&]{8,50})$';


  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordComponent>,
    public formBuilder: FormBuilder,
    public headerService: HeaderService,
    private adminBaseService: AdminBaseService,
    private alertService: AlertService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.forgotPswdForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.maxLength(40),
        Validators.pattern('^(?:(\\+?)\\d{8,14}|(("[\\w-\\s]+")|([\\w-]+(?:\\.[\\w-]+)*)|("[\\w-\\s]+")([\\w-]+(?:\\.[\\w-]+)*))(@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$)|(@\\[?((25[0-5]\\.|2[0-4][0-9]\\.|1[0-9]{2}\\.|[0-9]{1,2}\\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]))$')]]
    });

  }

  get frmSignIn(): any { return this.forgotPswdForm.controls; }

  public onSubmitForm(): any {

    if (this.forgotPswdForm.invalid) {
      return false;
    }
    this.headerService.toggleSpinner(true);
    const requestBody = Object.assign({}, this.forgotPswdForm.value);
    requestBody.username = this.commonService.encrypt(requestBody.username);

    this.subscriptions.push(this.adminBaseService
      .requestSubmit('ADM_FORGOT_USER_PASSWORD', requestBody).subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === ResponseStatusModel.SUCCESS) {
              setTimeout(() => {
                this.alertService.open(ResponseStatusModel.SUCCESS, 'OTP Successfully send your email , Please use OTP login to your account');
                this.dialogRef.close();
              }, 100);            
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
