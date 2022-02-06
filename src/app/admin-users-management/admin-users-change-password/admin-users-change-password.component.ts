import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { CommonService } from 'src/app/core/services/common.service';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-admin-users-change-password',
  templateUrl: './admin-users-change-password.component.html',
  styleUrls: ['./admin-users-change-password.component.scss']
})
export class AdminUsersChangePasswordComponent implements OnInit {

  adminUserPswdChangeForm: FormGroup;
  hide = true;
  hideNP = true;
  pswdPolicy = '^((?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@.$!%*?&])[A-Za-z\\d@.$!%*?&]{8,50})$';
  constructor(
    public dialogRef: MatDialogRef<AdminUsersChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public headerService: HeaderService,
    public alertService: AlertService,
    public adminBaseService: AdminBaseService,
    private commonService: CommonService
  ) { }

  ngOnInit(): any {

    this.adminUserPswdChangeForm = this.formBuilder.group({
      userId: [this.row.data ? this.row.data.userId : '', [Validators.required, Validators.maxLength(50)]],
      oldPassword: ['', [Validators.required, Validators.maxLength(50)]],
      newPassword: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(this.pswdPolicy)]],
    });
  }
  get eform(): any { return this.adminUserPswdChangeForm.controls; }

  onSubmit(): any {
    
    if (this.adminUserPswdChangeForm.invalid) {      
      return false;
    }
    const requestBody = Object.assign({}, this.adminUserPswdChangeForm.value);
    requestBody.oldPassword = this.commonService.encrypt(requestBody.oldPassword);
    requestBody.newPassword = this.commonService.encrypt(requestBody.newPassword);

    this.headerService.toggleSpinner(true);
    this.adminBaseService.requestSubmit('ADM_CHANGE_ADMIN_PASSWORD', requestBody).subscribe((response) => {
      if (response) {
        if (response.result) {
          if (response.result.status === ResponseStatusModel.SUCCESS) {
            this.alertService.open(ResponseStatusModel.SUCCESS, response.result.data);
            this.dialogRef.close({ action: 'ChangePswd', rowValue: response.result.data });
          } else if (response.result.status === ResponseStatusModel.ERROR) {
            this.alertService.open(ResponseStatusModel.ERROR, response.result.errorMessage);
          }
        }
        this.headerService.toggleSpinner(false);
      }
    },
      (error: any) => {
        this.headerService.toggleSpinner(false);     
      });
  }

}
