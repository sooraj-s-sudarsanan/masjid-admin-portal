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
  selector: 'app-tax-type-grid-action',
  templateUrl: './tax-type-grid-action.component.html',
  styleUrls: ['./tax-type-grid-action.component.scss']
})
export class TaxTypeGridActionComponent implements OnInit {

  form: FormGroup;
  countryList: any;

  constructor(
    public dialogRef: MatDialogRef<TaxTypeGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      taxTypeId : [this.row.data ? this.row.data.taxTypeId : ''],
      taxTypeName:[this.row.data ? this.row.data.taxTypeName : '',[Validators.required, Validators.maxLength(100)]],
      taxTypeDesc: [this.row.data ? this.row.data.taxTypeDesc : '', [Validators.maxLength(500)]],
      taxTypeCode:[this.row.data ? this.row.data.taxTypeCode : '',[Validators.required, Validators.maxLength(100)]],
      taxTypeCountryCode: [this.row.data ? this.row.data.taxTypeCountryCode : '', [Validators.required, Validators.maxLength(256)]],
    });
     // Get country
     this.headerService.toggleSpinner(true);
     this.adminBaseService.requestSubmit('ADM_LIST_NATIONALITY', null).subscribe((response) => {
       if (response) {
         if (response.result) {
           if (response.result.status === 'SUCCESS') {
             this.countryList = response.result.data;
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
    this.manageGridService.addORupdateRowData(ModuleKeyModel.taxType.key, this.row.data ? false : true, this.form.value)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.taxType.name} ${this.row.data ? 'edited' : 'created'} successfully`);
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
