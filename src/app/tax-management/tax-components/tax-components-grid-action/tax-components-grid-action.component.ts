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
  selector: 'app-tax-components-grid-action',
  templateUrl: './tax-components-grid-action.component.html',
  styleUrls: ['./tax-components-grid-action.component.scss']
})
export class TaxComponentsGridActionComponent implements OnInit {

  form: FormGroup;
  typeList = [];

  constructor(
    public dialogRef: MatDialogRef<TaxComponentsGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      taxComponentId: [this.row.data ? this.row.data.taxComponentId : ''],
      taxComponentName: [this.row.data ? this.row.data.taxComponentName : '', [Validators.required, Validators.maxLength(50)]],
      taxComponentDesc: [this.row.data ? this.row.data.taxComponentDesc : '', [Validators.maxLength(500)]],
      taxComponentCode: [this.row.data ? this.row.data.taxComponentCode : '', [Validators.required, Validators.maxLength(50)]],
      valuationType: [this.row.data ? this.row.data.valuationType : '', [Validators.required, Validators.maxLength(50)]],
      taxRate: [this.row.data ? this.row.data.taxRate : '', [Validators.required,Validators.max(100)]],
      taxType: this.formBuilder.group({
        taxTypeId: [this.row.data ? this.row.data.taxType ?
          this.row.data.taxType.taxTypeId : '' : '', [Validators.required]]
      })     
    });

    this.adminBaseService.requestSubmit('ADM_LIST_TAX_TYPE', null).subscribe((response) => {

      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.typeList = response.result.data;
          }
        }
      }   
    });
  }

  get eform(): any { return this.form.controls; }

  onSubmit(): any {

    const action = this.row.data ? 'Edit' : 'New';
    if (this.form.invalid) {
      return false;
    }  

    this.manageGridService.addORupdateRowData(ModuleKeyModel.taxComponents.key, this.row.data ? false : true, this.form.value)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.loyalityScheme.name} ${this.row.data ? 'edited' : 'created'} successfully`);
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
