import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-house-register-grid-action',
  templateUrl: './house-register-grid-action.component.html',
  styleUrls: ['./house-register-grid-action.component.scss']
})
export class HouseRegisterGridActionComponent implements OnInit {

  form: FormGroup;
  familyList = [];
  memberList = [];


  constructor(
    public dialogRef: MatDialogRef<HouseRegisterGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      houseNo: [this.row.data ? this.row.data.houseNo : '', [Validators.required]],
      houseLandPhone: [this.row.data ? this.row.data.houseLandPhone : '', [Validators.required]],
      houseName: [this.row.data ? this.row.data.houseName : '', [Validators.required, Validators.maxLength(50)]],
      houseAddress1: [this.row.data ? this.row.data.houseAddress1 : '', [Validators.required, Validators.maxLength(225)]],
      houseMobileNo: [this.row.data ? this.row.data.houseMobileNo : '', [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],

      block: [this.row.data ? this.row.data.block : '', [Validators.required]],
      villege: [this.row.data ? this.row.data.villege : '', [Validators.required]],
      ward: [this.row.data ? this.row.data.ward : '', [Validators.required]],
      area: [this.row.data ? this.row.data.area : ''],
      zone: [this.row.data ? this.row.data.zone : ''],
      pincode: [this.row.data ? this.row.data.pincode : '', [Validators.required, Validators.pattern('^[1-9][0-9]{5}$')]],
      rationType: [this.row.data ? this.row.data.rationType : ''],
      rationCardNo: [this.row.data ? this.row.data.rationCardNo : ''],
      relativeMahal: [this.row.data ? this.row.data.relativeMahal : '', [Validators.maxLength(250)]],
      previousJamath: [this.row.data ? this.row.data.previousJamath : '', [Validators.maxLength(250)]],
      remarks: [this.row.data ? this.row.data.remarks : '', [Validators.maxLength(500)]],

      family: this.formBuilder.group({
        familyId: [this.row.data ? this.row.data.family ? this.row.data.family.familyId : '' : '', [Validators.required]]
      }),

      member: this.formBuilder.group({
        memberId: [this.row.data ? this.row.data.member ? this.row.data.member.memberId : '' : '', [Validators.required]]
      }),
      houseId: [this.row.data ? this.row.data.houseId : null]
    });

    // Get all Family list
    this.headerService.toggleSpinner(true);
    this.adminBaseService.requestSubmit('ADM_LIST_FAMILY_REGISTER', null).subscribe((response) => {
      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.familyList = response.result.data;

            if (this.row?.data?.family) {
              this.OnFamilyChange(this.row.data.family.familyId)
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


  }
  OnFamilyChange(value) {
    if (value) {
      const param = {
        filter: `family.familyId==${value}`,
      }
      // Get Member related to family list
      this.headerService.toggleSpinner(true);
      this.adminBaseService.requestSubmit('ADM_LIST_MEMBER_REGISTER', param).subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.memberList = response.result.data;
            }
          }
          this.headerService.toggleSpinner(false);
        }
      },
        (error: any) => {
          this.headerService.toggleSpinner(false);
          console.log(error);
        });
    };
  }


  get eform(): any { return this.form.controls; }

  onSubmit(): any {

    const action = this.row.data ? 'Edit' : 'New';
    if (this.form.invalid) {
      return false;
    }
    this.manageGridService.addORupdateRowData(ModuleKeyModel.houseRegister.key, this.row.data ? false : true, this.form.value)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.houseRegister.name} ${this.row.data ? 'edited' : 'created'} successfully`);
            }
          }
        }
      },
        (error: any) => {
          console.log(error);
        });
  }
  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }
}
