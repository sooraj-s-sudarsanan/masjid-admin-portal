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
  selector: 'app-divorce-register-grid-action',
  templateUrl: './divorce-register-grid-action.component.html',
  styleUrls: ['./divorce-register-grid-action.component.scss']
})
export class DivorceRegisterGridActionComponent implements OnInit {

  form: FormGroup;
  familyList = [];
  marriageList = [];
  dobMaxDate = new Date();

  constructor(
    public dialogRef: MatDialogRef<DivorceRegisterGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      divorcedDate: [this.row.data ? this.row.data.divorcedDate : '', [Validators.required]],
      otherInfo: [this.row.data ? this.row.data.otherInfo : '', [Validators.required, Validators.maxLength(500)]],
      reason: [this.row.data ? this.row.data.reason : '', [Validators.required, Validators.maxLength(500)]],
      maharDetails: [this.row.data ? this.row.data.maharDetails : '', [Validators.required, Validators.maxLength(500)]],
      delegateName: [this.row.data ? this.row.data.delegateName : '', [Validators.required, Validators.maxLength(250)]],
      witness1: [this.row.data ? this.row.data.witness1 : '', [Validators.required, Validators.maxLength(250)]],
      witness2: [this.row.data ? this.row.data.witness2 : '', [Validators.required, Validators.maxLength(250)]],

      family: this.formBuilder.group({
        familyId: [this.row.data ? this.row.data.family ? this.row.data.family.familyId : '' : '', [Validators.required]]
      }),
      marriage: this.formBuilder.group({
        marriageId: [this.row.data ? this.row.data.member ? this.row.data.member.memberId : '' : '', [Validators.required]]
      }),
      divorceId: [this.row.data ? this.row.data.divorceId : null],
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
      this.adminBaseService.requestSubmit('ADM_LIST_MARRIAGE_REGISTER', param).subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.marriageList = response.result.data;
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
    this.manageGridService.addORupdateRowData(ModuleKeyModel.divorceRegister.key, this.row.data ? false : true, this.form.value)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.divorceRegister.name} ${this.row.data ? 'edited' : 'created'} successfully`);
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
