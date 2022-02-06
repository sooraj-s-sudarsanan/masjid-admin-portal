import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AlertService } from 'src/app/core/services/alert.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-country-grid-action',
  templateUrl: './country-grid-action.component.html',
  styleUrls: ['./country-grid-action.component.scss']
})
export class CountryGridActionComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CountryGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nationalityName: [this.row.data ? this.row.data.nationalityName : '', [Validators.required, Validators.maxLength(100)]],
      nationalityNameArb: [this.row.data ? this.row.data.nationalityNameArb : '', [Validators.required, Validators.maxLength(100)]],
      nationalityCode: [this.row.data ? this.row.data.nationalityCode : '', [Validators.required, Validators.maxLength(10)]],
      countryCode: [this.row.data ? this.row.data.countryCode : '', [Validators.required, Validators.maxLength(10)]],
      nationalityId: [this.row.data ? this.row.data.nationalityId : ''],
      currency: ['', [Validators.required, Validators.maxLength(10)]]
    });
  }

  get eform(): any { return this.form.controls; }

  onSubmit(): any {

    const action = this.row.data ? 'Edit' : 'New';
    if (this.form.invalid) {
      return false;
    }
    this.manageGridService.addORupdateRowData(ModuleKeyModel.countryModule.key, this.row.data ? false : true, this.form.value)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.countryModule.name} ${this.row.data ? 'edited' : 'created'} successfully`);
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
