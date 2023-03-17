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
  selector: 'app-family-register-grid-action',
  templateUrl: './family-register-grid-action.component.html',
  styleUrls: ['./family-register-grid-action.component.scss']
})
export class FamilyRegisterGridActionComponent implements OnInit {
  form: FormGroup;
  masterList = [];
  constructor(
    public dialogRef: MatDialogRef<FamilyRegisterGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService
  ) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      familyNo: [this.row.data ? this.row.data.familyNo : '', [Validators.required, Validators.maxLength(50)]],
      familyName: [this.row.data ? this.row.data.familyName : '', [Validators.required, Validators.maxLength(50)]],
      phone: [this.row.data ? this.row.data.phone : '', [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],
      originFrom: [this.row.data ? this.row.data.originFrom : '', [Validators.maxLength(500)]],
      income: [this.row.data ? this.row.data.income : '', [Validators.required]],
      registerMaster: this.formBuilder.group({
        registerMasterId: [this.row.data ? this.row.data.registerMaster ? this.row.data.registerMaster.registerMasterId : '' : '', [Validators.required]]
      }),
      familyId: [this.row.data ? this.row.data.familyId : null]
    });

    // Get all master list
    this.headerService.toggleSpinner(true);
    this.adminBaseService.requestSubmit('ADM_LIST_REGISTER_MASTER', null).subscribe((response) => {
      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.masterList = response.result.data;
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
    this.manageGridService.addORupdateRowData(ModuleKeyModel.familyRegister.key, this.row.data ? false : true, this.form.value)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.familyRegister.name} ${this.row.data ? 'edited' : 'created'} successfully`);
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
