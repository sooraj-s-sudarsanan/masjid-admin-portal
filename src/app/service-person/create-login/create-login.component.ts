import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { CommonService } from 'src/app/core/services/common.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-create-login',
  templateUrl: './create-login.component.html',
  styleUrls: ['./create-login.component.scss']
})
export class CreateLoginComponent implements OnInit {

  adminUserForm: FormGroup;
  pswdPolicy = '^((?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@.$!%*?&])[A-Za-z\\d@.$!%*?&]{8,50})$';

  constructor(
    public dialogRef: MatDialogRef<CreateLoginComponent>,
    public formBuilder: FormBuilder,
    public headerService: HeaderService,
    public adminBaseService: AdminBaseService,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    if (this.row) {
      if (this.row.data) {
        this.headerService.toggleSpinner(true);

        //Check email already exist or not
        if (this.row.data.email) {
          const request = {
            username: this.commonService.encrypt(this.row.data.email)
          };
          this.adminBaseService.requestSubmit('ADM_GET_ADMINUSER_BYNAME', request).subscribe((response) => {
            if (response) {
              if (response.result!=null) {
                this.alertService.open
                (ResponseStatusModel.ERROR, `Login already created for this service person`);
                this.dialogRef.close();
              }
              this.headerService.toggleSpinner(false);
            }
          },
            (error: any) => {
              this.headerService.toggleSpinner(false);
              console.log(error);
            });
        } else {
          this.dialogRef.close();
        }


        this.adminUserForm = this.formBuilder.group({
          fullName: [this.row.data.servicePersonName, [Validators.required]],
          // tslint:disable-next-line: max-line-length
          mobileNo: [this.row.data.mobileNo, [Validators.required, Validators.maxLength(15), Validators.pattern('^[0-9]+$')]],
          // tslint:disable-next-line: max-line-length
          email: [this.row.data.email, [Validators.required, Validators.email, Validators.maxLength(50)]],
          password: ['', [Validators.required, Validators.pattern(this.pswdPolicy)]],
          userRole: this.formBuilder.group({
            roleName: [null, [Validators.required]]
          }),
          merchant: this.formBuilder.group({
            merchantId: [this.row.data.merchantId]
          }),
          branch: this.formBuilder.group({
            branchId: [this.row.data.branchId]
          })
        });

        const request = {
          filter: '',
          sortBy: '',
          sortOrder: 'ASC'
        };
        this.adminBaseService.requestSubmit('ADM_LIST_ROLES', request).subscribe((response) => {
          if (response) {
            if (response.result) {
              if (response.result.status === 'SUCCESS') {
                const find = response.result.data.find(x => x.roleName == "Merchant Employee");
                if (find) {
                  this.adminUserForm.get('userRole.roleName').setValue(find.roleName);
                } else {
                  this.dialogRef.close();
                }
              }
            }
            this.headerService.toggleSpinner(false);
          }
        },
          (error: any) => {
            this.headerService.toggleSpinner(false);
            console.log(error);
          });
      } else {
        this.dialogRef.close();
      }
    } else {
      this.dialogRef.close();
    }
  }

  get eform(): any { return this.adminUserForm.controls; }

  onSubmit() {
    if (this.adminUserForm.invalid) {
      return false;
    }
    const requestBody = Object.assign({}, this.adminUserForm.value);
    requestBody.fullName = this.commonService.encrypt(requestBody.fullName);
    requestBody.mobileNo = this.commonService.encrypt(requestBody.mobileNo);
    requestBody.email = this.commonService.encrypt(requestBody.email);
    requestBody.password = this.commonService.encrypt(requestBody.password);

    this.manageGridService
      .addORupdateRowData(ModuleKeyModel.adminUserManagement.key, true, requestBody)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {

              this.dialogRef.close();
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `login credentials created successfully`);
            }
          }
        }
      },
        (error: any) => {
          console.log(error);
        });
  }
}
