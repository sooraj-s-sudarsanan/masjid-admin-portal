import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-offer-type-grid-action',
  templateUrl: './offer-type-grid-action.component.html',
  styleUrls: ['./offer-type-grid-action.component.scss']
})
export class OfferTypeGridActionComponent implements OnInit {

  form: FormGroup;
  categoryList: any;

  constructor(
    public dialogRef: MatDialogRef<OfferTypeGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      offerTypeName: [this.row.data ? this.row.data.offerTypeName : '', [Validators.required, Validators.maxLength(100)]],
      offerTypeNameAR: [this.row.data ? this.row.data.offerTypeNameAR : '', [Validators.required, Validators.maxLength(100)]],
      offerTypeDesc: [this.row.data ? this.row.data.offerTypeDesc : '', [Validators.maxLength(1000)]],
      offerTypeDescAR: [this.row.data ? this.row.data.offerTypeDescAR : '', [Validators.maxLength(1000)]],
      offerTypeId: [this.row.data ? this.row.data.offerTypeId : ''],
    });   
  }
  get eform(): any { return this.form.controls; }
  onSubmit(): any {

    const action = this.row.data ? 'Edit' : 'New';
    if (this.form.invalid) {
      return false;
    }
    this.manageGridService.addORupdateRowData(ModuleKeyModel.offerType.key, this.row.data ? false : true, this.form.value)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.offerType.name} ${this.row.data ? 'edited' : 'created'} successfully`);
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
