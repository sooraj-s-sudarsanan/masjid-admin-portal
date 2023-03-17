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
  selector: 'app-member-register-grid-action',
  templateUrl: './member-register-grid-action.component.html',
  styleUrls: ['./member-register-grid-action.component.scss']
})
export class MemberRegisterGridActionComponent implements OnInit {

  form: FormGroup;
  familyList = [];
  selected: any;
  dobMaxDate = new Date();
  

  constructor(
    public dialogRef: MatDialogRef<MemberRegisterGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: [this.row.data ? this.row.data.firstName : '', [Validators.required, Validators.maxLength(100)]],
      membershipNumber: [this.row.data ? this.row.data.membershipNumber : new Date().valueOf()],
      lastName: [this.row.data ? this.row.data.lastName : '', [Validators.required, Validators.maxLength(100)]],
      gender: [this.row.data ? this.row.data.gender : '', [Validators.required]],
      bloodGroup: [this.row.data ? this.row.data.bloodGroup : '', [Validators.required]],
      dateOfBirth: [this.row.data ? this.row.data.dateOfBirth : '', [Validators.required]],
      fatherName: [this.row.data ? this.row.data.fatherName : '', [Validators.maxLength(100)]],
      motherName: [this.row.data ? this.row.data.motherName : '', [Validators.maxLength(100)]],
      mobile: [this.row.data ? this.row.data.mobile : '', [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],
      email: [this.row.data ? this.row.data.email : '', [Validators.email]],
      occupation: [this.row.data ? this.row.data.occupation : '', [Validators.maxLength(250)]],
      maritalStatus: [this.row.data ? this.row.data.maritalStatus : ''],
      marriedToJamath: [this.row.data ? this.row.data.marriedToJamath : ''],
      aAdhaarNo: [this.row.data ? this.row.data.aAdhaarNo : '', [Validators.pattern('^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$')]],
      relativeMahal: [this.row.data ? this.row.data.relativeMahal : ''],
      previousJamath: [this.row.data ? this.row.data.previousJamath : ''],
      noOfKids: [this.row.data ? this.row.data.noOfKids : '', [Validators.max(50)]],
      noOfSons: [this.row.data ? this.row.data.noOfSons : '', [Validators.max(50)]],
      noOfDaughters: [this.row.data ? this.row.data.noOfDaughters : '', [Validators.max(50)]],
      photo: [this.row.data ? this.row.data.photo : ''],
      husbandName: [this.row.data ? this.row.data.husbandName : '', [Validators.maxLength(100)]],
      wifeName: [this.row.data ? this.row.data.wifeName : '', [Validators.maxLength(100)]],
      family: this.formBuilder.group({
        familyId: [this.row.data ? this.row.data.family ? this.row.data.family.familyId : '' : '', [Validators.required]]
      }),
      memberId: [this.row.data ? this.row.data.memberId : null]
    });
    // Get all family list
    this.headerService.toggleSpinner(true);
    this.adminBaseService.requestSubmit('ADM_LIST_FAMILY_REGISTER', null).subscribe((response) => {
      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.familyList = response.result.data;

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

  get eform(): any { return this.form.controls; }

  onSubmit(): any {

    const action = this.row.data ? 'Edit' : 'New';
    if (this.form.invalid) {
      return false;
    }
    this.manageGridService.addORupdateRowData(ModuleKeyModel.memberRegister.key, this.row.data ? false : true, this.form.value)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.memberRegister.name} ${this.row.data ? 'edited' : 'created'} successfully`);
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
