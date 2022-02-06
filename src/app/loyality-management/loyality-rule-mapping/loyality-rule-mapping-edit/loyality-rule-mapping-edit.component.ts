import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AlertService } from 'src/app/core/services/alert.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';
import * as _moment from 'moment';

@Component({
  selector: 'app-loyality-rule-mapping-edit',
  templateUrl: './loyality-rule-mapping-edit.component.html',
  styleUrls: ['./loyality-rule-mapping-edit.component.scss']
})
export class LoyalityRuleMappingEditComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LoyalityRuleMappingEditComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
  ) { }

  ngOnInit(): void {
    if (!this.row.data) {
      this.alertService.open(ResponseStatusModel.ERROR, 'Loyalty Rule Mapping data are missing.')
      this.dialogRef.close();
    }
    
    this.form = this.formBuilder.group({
      loyaltyRuleMappingId: [this.row.data ? this.row.data.loyaltyRuleMappingId : '', [Validators.required]],
      branchId: [this.row.data ? this.row.data.branchId : '', [Validators.required]],
      serviceId: [this.row.data ? this.row.data.serviceId : '', [Validators.required]],
      serviceMappingId: [this.row.data ? this.row.data.serviceMappingId : '', [Validators.required]],

      rewardPointStartDate: [this.row.data ? _moment(this.row.data.rewardPointStartDate, 'DD-MM-YYYY') : '', [Validators.required]],
      rewardPointEndDate: [this.row.data ? _moment(this.row.data.rewardPointEndDate, 'DD-MM-YYYY') : '', [Validators.required]],
      servicePrice: [this.row.data ? this.row.data.servicePrice : '', [Validators.required]],
      rewardPointApplicable: [this.row.data ? this.row.data.rewardPointApplicable : '', [Validators.required]],
      loyaltyRule: this.formBuilder.group({
        loyaltyRuleId: [this.row.data ? this.row.data.loyaltyRuleId : null, [Validators.required]]
      })     
    });
    this.form.get('servicePrice').disable()
  }

  get eform(): any { return this.form.controls; }
  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }

  onSubmit(): any {

    if (this.form.invalid) {
      this.alertService.open
        (ResponseStatusModel.ERROR, `Please check mandatory fields or invalid values`);
      return false;
    }
    const formData = this.form.getRawValue();
    formData.rewardPointStartDate = this.form.get('rewardPointStartDate').value.format('DD-MM-YYYY');
    formData.rewardPointEndDate = this.form.get('rewardPointEndDate').value.format('DD-MM-YYYY');

    const listToProcess = [];
    listToProcess.push(formData);
    const requestParams = {
      listToProcess
    };
   
    this.manageGridService.addORupdateRowData(ModuleKeyModel.loyalityRuleMapping.key, false, requestParams)
      .subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS' && response.result.data.length) {
              this.dialogRef.close({ rowValue: response.result.data[0] });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.loyalityRuleMapping.name} updated successfully`);
            }
          }
        }
      },
        (error: any) => {

        });
  }
}
