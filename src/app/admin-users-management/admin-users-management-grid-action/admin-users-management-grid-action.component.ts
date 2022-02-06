import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { RoleModel } from 'src/app/core/model/role-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { CommonService } from 'src/app/core/services/common.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';
import { RoleService } from 'src/app/core/services/role.service';

@Component({
  selector: 'app-admin-users-management-grid-action',
  templateUrl: './admin-users-management-grid-action.component.html',
  styleUrls: ['./admin-users-management-grid-action.component.scss']
})
export class AdminUsersManagementGridActionComponent implements OnInit {

  adminUserForm: FormGroup;
  roleTypeList: any[] = [];
  hide = true;
  emailPattern = '';
  pswdPolicy = '^((?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@.$!%*?&])[A-Za-z\\d@.$!%*?&]{8,15})$';
  merchantList: any;
  branchList: any[];
  nationalityList: any;
  selectedCountry = '00974';
  constructor(
    public dialogRef: MatDialogRef<AdminUsersManagementGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public roleService: RoleService,
    public manageGridService: ManageGridService,
    public headerService: HeaderService,
    public alertService: AlertService,
    public authenticationService: AuthenticationService,
    public adminBaseService: AdminBaseService,
    private commonService: CommonService
  ) {
  }

  ngOnInit(): void {
    const mobSplit = this.row.data ? this.row.data.mobileNo.split('-') : [];
    if (mobSplit.length == 2) {
      this.row.data.countryCode = mobSplit[0];// Manage for old case
    } else if (this.row.data && this.row.data.countryCode) {
      var re = `/${this.row.data.countryCode}/gi`;
      this.row.data.mobileNo.replace(re, "");
    }
    this.adminUserForm = this.formBuilder.group({
      fullName: [this.row.data ? this.row.data.fullName : '', [Validators.required, Validators.maxLength(50)]],
      // tslint:disable-next-line: max-line-length
      mobileNo: [this.row.data ? mobSplit.length == 2 ? mobSplit[1] : this.row.data.mobileNo : '', [Validators.required, Validators.maxLength(15), Validators.pattern('^[0-9]+$')]],
      // tslint:disable-next-line: max-line-length
      email: [this.row.data ? this.row.data.email : '', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: [null],
      userRole: this.formBuilder.group({
        roleName: [this.row.data ? this.row.data.userRole.roleName : null, [Validators.required]]
      }),
      userId: [this.row.data ? this.row.data.userId : ''],
      merchant: this.formBuilder.group({
        merchantId: [this.row.data ? this.row.data.merchant ? this.row.data.merchant.merchantId : '' : '']
      }),
      branch: this.formBuilder.group({
        branchId: [this.row.data ? this.row.data.branch ? this.row.data.branch.branchId : '' : '']
      }),
      countryCode: this.formBuilder.group({
        nationalityId: [this.row.data ? this.row.data.countryCode ? this.row.data.countryCode.nationalityId : '00974' : '00974', [Validators.required]]
      })
    });
    if (!this.row.data) {
      this.adminUserForm.controls['password'].setValidators([Validators.required, Validators.pattern(this.pswdPolicy), Validators.maxLength(15)]);
    }

    // Get all role types
    setTimeout(() => {
      this.headerService.toggleSpinner(true);
    }, 100);
    const request = {
      filter: '',
      sortBy: '',
      sortOrder: 'ASC'
    };
    this.adminBaseService.requestSubmit('ADM_LIST_ROLES', request).subscribe((response) => {
      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.roleTypeList = response.result.data;

            // console.log('info', this.authenticationService.userInfo);
            if (this.authenticationService.userInfo) {
              if (this.authenticationService.userInfo.userRole.roleName.toUpperCase() === RoleModel.branchAdmin.toUpperCase()) {
                const disabledAccessRoles = ['Admin', 'Merchant Admin'];
                this.RemoveNotAccessRoles(disabledAccessRoles);
              } else if (this.authenticationService.userInfo.userRole.roleName.toUpperCase() === RoleModel.merchantAdmin.toUpperCase()) {
                const disabledAccessRoles = ['Admin'];
                this.RemoveNotAccessRoles(disabledAccessRoles);
              }
            }


            if (this.row.data) {
              if (this.row.data.userRole) {
                this.roleNameChange(this.row.data.userRole.roleName);
              }
              if (this.row.data.merchant) {
                this.loadMerchant();
              }
            }
          }
        }
        this.headerService.toggleSpinner(false);
      }
    },
      (error: any) => {
        this.headerService.toggleSpinner(false);

      });
    this.adminBaseService.requestSubmit('ADM_LIST_NATIONALITY', request).subscribe((response) => {
      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.nationalityList = response.result.data;
          }
        }
      }
    });

  }
  get eform(): any { return this.adminUserForm.controls; }

  RemoveNotAccessRoles(disabledAccessRoles: any) {

    disabledAccessRoles.forEach(item => {

      const index = this.roleTypeList.findIndex(x => x.roleName == item);
      if (index > -1) {
        this.roleTypeList.splice(index, 1);
        // console.log(this.roleTypeList)
      }
    });
  }

  onSubmit(): any {
    const action = this.row.data ? 'Edit' : 'New';
    if (this.adminUserForm.invalid) {
      return false;
    }
    const requestBody = Object.assign({}, this.adminUserForm.value);
    const findCountry = this.nationalityList.find(x => x.nationalityId == requestBody.countryCode.nationalityId);
    if (findCountry) {
      requestBody.fullName = this.commonService.encrypt(requestBody.fullName);
      requestBody.mobileNo = this.commonService.encrypt(requestBody.mobileNo);
      requestBody.email = this.commonService.encrypt(requestBody.email);
      if (!this.row.data) {
        requestBody.password = this.commonService.encrypt(requestBody.password);
      } else {
        // delete requestBody.password;
      }
      
      if (requestBody.userRole.roleName === 'Admin') {
        requestBody.merchant.merchantId = '';
        requestBody.branch.branchId = '';
      }

      if (!requestBody.userId) {
        delete requestBody.userId;
      }

      this.manageGridService
        .addORupdateRowData(ModuleKeyModel.adminUserManagement.key, this.row.data ? false : true, requestBody)
        .subscribe((response) => {

          if (response) {
            if (response.result) {
              if (response.result.status === 'SUCCESS') {
                if (response.result.data.fullName) {
                  response.result.data.fullName = this.commonService.decryptor(response.result.data.fullName);
                }
                if (response.result.data.mobileNo) {
                  response.result.data.mobileNo = this.commonService.decryptor(response.result.data.mobileNo);
                }
                if (response.result.data.email) {
                  response.result.data.email = this.commonService.decryptor(response.result.data.email);
                }

                this.dialogRef.close({ action, rowValue: response.result.data });
                this.alertService.open
                  (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.adminUserManagement.name} ${this.row.data ? 'edited' : 'created'} successfully`);
              }
            }
          }
        },
          (error: any) => {

          });
    }
  }

  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }

  roleNameChange(roleId: any): void {
    if (roleId) {
      if (roleId === 'Branch Admin') {
        this.adminUserForm.get('merchant.merchantId').setValidators([Validators.required]);
        this.adminUserForm.get('merchant.merchantId').setValue(null);
        this.adminUserForm.get('merchant.merchantId').updateValueAndValidity();

        this.adminUserForm.get('branch.branchId').setValidators([Validators.required]);
        this.adminUserForm.get('branch.branchId').setValue(null);
        this.adminUserForm.get('branch.branchId').updateValueAndValidity();
        this.loadMerchant();
      } else if (roleId === 'Merchant Admin') {
        this.adminUserForm.get('merchant.merchantId').setValidators([Validators.required]);
        this.adminUserForm.get('merchant.merchantId').setValue(null);
        this.adminUserForm.get('merchant.merchantId').updateValueAndValidity();

        this.adminUserForm.get('branch.branchId').setValidators([]);
        this.adminUserForm.get('branch.branchId').setValue('');
        this.adminUserForm.get('branch.branchId').updateValueAndValidity();

        this.loadMerchant();
      } else if (roleId === 'Merchant Employee') {
        this.adminUserForm.get('merchant.merchantId').setValidators([Validators.required]);
        this.adminUserForm.get('merchant.merchantId').setValue(null);
        this.adminUserForm.get('merchant.merchantId').updateValueAndValidity();

        this.adminUserForm.get('branch.branchId').setValidators([Validators.required]);
        this.adminUserForm.get('branch.branchId').setValue(null);
        this.adminUserForm.get('branch.branchId').updateValueAndValidity();

        // this.adminUserForm.get('servicePerson').setValidators([Validators.required]);
        // this.adminUserForm.get('servicePerson').setValue(null);
        // this.adminUserForm.get('servicePerson').updateValueAndValidity();
        this.loadMerchant();
      } else {
        this.adminUserForm.get('merchant.merchantId').setValidators([]);
        this.adminUserForm.get('merchant.merchantId').setValue(null);
        this.adminUserForm.get('merchant.merchantId').updateValueAndValidity();

        this.adminUserForm.get('branch.branchId').setValidators([]);
        this.adminUserForm.get('branch.branchId').setValue(null);
        this.adminUserForm.get('branch.branchId').updateValueAndValidity();
      }
    }
  }

  loadMerchant(): void {

    this.merchantList = [];
    setTimeout(() => {
      this.headerService.toggleSpinner(true);
    }, 100);

    if (this.authenticationService.userInfo) {
      let param = null;
      if (this.authenticationService.userInfo.userRole.roleName.toUpperCase() === RoleModel.branchAdmin.toUpperCase()) {
        param = {
          filter: `merchantId==${this.authenticationService.userInfo.merchant.merchantId}`,
        };
      } else if (this.authenticationService.userInfo.userRole.roleName.toUpperCase() === RoleModel.merchantAdmin.toUpperCase()) {
        param = {
          filter: `merchantId==${this.authenticationService.userInfo.merchant.merchantId}`,
        };
      }
      this.adminBaseService.requestSubmit('ADM_LIST_MERCHANTS', param).subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.merchantList = response.result.data;
              if (this.row.data) {
                if (this.row.data.merchant) {
                  this.adminUserForm.get('merchant.merchantId').setValue(this.row.data.merchant.merchantId)
                }
                if (this.row.data.branch) {
                  this.merchantChange(this.row.data.merchant.merchantId);
                }
              }
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

  merchantChange(merchantId): void {
    this.branchList = [];
    if (merchantId) {
      const param = {
        filter: `merchantBean.merchantId==${merchantId}`,
      };
      this.headerService.toggleSpinner(true);
      this.adminBaseService.requestSubmit('ADM_LIST_MERCHANT_BRANCHES', param).subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.branchList = response.result.data;
              if (this.row.data) {
                if (this.row.data.branch) {
                  this.adminUserForm.get('branch.branchId').setValue(this.row.data.branch.branchId);
                }
              }
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
}
