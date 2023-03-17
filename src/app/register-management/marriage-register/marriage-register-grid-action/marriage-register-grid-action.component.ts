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
  selector: 'app-marriage-register-grid-action',
  templateUrl: './marriage-register-grid-action.component.html',
  styleUrls: ['./marriage-register-grid-action.component.scss']
})
export class MarriageRegisterGridActionComponent implements OnInit {

  form: FormGroup;
  familyList = [];
  memberList = [];
  dobMaxDate = new Date();

  constructor(
    public dialogRef: MatDialogRef<MarriageRegisterGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      brideFirstName: [this.row.data ? this.row.data.brideFirstName : '', [Validators.required, Validators.maxLength(250)]],
      brideLastName: [this.row.data ? this.row.data.brideLastName : '', [Validators.required, Validators.maxLength(250)]],
      brideDOB: [this.row.data ? this.row.data.brideDOB : '', [Validators.required]],
      brideFatherName: [this.row.data ? this.row.data.brideFatherName : '', [Validators.required, Validators.maxLength(250)]],
      brideMotherName: [this.row.data ? this.row.data.brideMotherName : '', [Validators.required, Validators.maxLength(250)]],
      brideMobile: [this.row.data ? this.row.data.brideMobile : '', [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],
      brideEmail: [this.row.data ? this.row.data.brideEmail : '', [Validators.email]],
      brideAddress: [this.row.data ? this.row.data.brideAddress : '', [Validators.required, Validators.maxLength(500)]],

      groomFirstName: [this.row.data ? this.row.data.groomFirstName : '', [Validators.required, Validators.maxLength(250)]],
      groomLastName: [this.row.data ? this.row.data.groomLastName : '', [Validators.required, Validators.maxLength(250)]],
      groomDOB: [this.row.data ? this.row.data.groomDOB : '', [Validators.required]],
      groomFather: [this.row.data ? this.row.data.groomFather : '', [Validators.required, Validators.maxLength(250)]],
      groomMother: [this.row.data ? this.row.data.groomMother : '', [Validators.required, Validators.maxLength(250)]],
      groomEmail: [this.row.data ? this.row.data.groomEmail : '', [Validators.email]],
      groomAddress: [this.row.data ? this.row.data.groomAddress : '', [Validators.required, Validators.maxLength(500)]],

      witness1: [this.row.data ? this.row.data.witness1 : '', [Validators.required, Validators.maxLength(250)]],
      witness2: [this.row.data ? this.row.data.witness2 : '', [Validators.required, Validators.maxLength(250)]],


      family: this.formBuilder.group({
        familyId: [this.row.data ? this.row.data.family ? this.row.data.family.familyId : '' : '', [Validators.required]]
      }),

      member: this.formBuilder.group({
        memberId: [this.row.data ? this.row.data.member ? this.row.data.member.memberId : '' : '', [Validators.required]]
      }),

      marriageId: [this.row.data ? this.row.data.marriageId : null],
      marriageNo: [this.row.data ? this.row.data.marriageNo : new Date().valueOf()]
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
    this.manageGridService.addORupdateRowData(ModuleKeyModel.marriageRegister.key, this.row.data ? false : true, this.form.value)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.marriageRegister.name} ${this.row.data ? 'edited' : 'created'} successfully`);
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
