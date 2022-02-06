import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';
import { LoyalitySchemeGridActionComponent } from '../../loyality-scheme/loyality-scheme-grid-action/loyality-scheme-grid-action.component';
import * as _moment from 'moment';
import { Subscription } from 'rxjs';
import { DropDownService } from 'src/app/core/services/drop-down.service';

@Component({
  selector: 'app-loyality-rule-grid-action',
  templateUrl: './loyality-rule-grid-action.component.html',
  styleUrls: ['./loyality-rule-grid-action.component.scss']
})
export class LoyalityRuleGridActionComponent implements OnInit {

  form: FormGroup;
  SchemeList = [];
  loyaltyList = [];
  min = new Date();
  subscriptions: Subscription[] = [];
  merchantList: any[];
  branchList: any[];

  constructor(
    public dialogRef: MatDialogRef<LoyalitySchemeGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService,
    public dropDownService: DropDownService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      loyaltyRuleId: [this.row.data ? this.row.data.loyaltyRuleId : ''],
      merchantId: [this.row.data ? this.row.data.merchantId : ''],
      branchId: [this.row.data ? this.row.data.branchId : ''],
      loyaltyRuleName: [this.row.data ? this.row.data.loyaltyRuleName : '', [Validators.required, Validators.maxLength(256)]],
      rewardExpiryDays: [this.row.data ? this.row.data.rewardExpiryDays : '', [Validators.required,Validators.min(1)]],
      loyaltyRuleDesc: [this.row.data ? this.row.data.loyaltyRuleDesc : '', [Validators.maxLength(256)]],
      // loyaltyStartDate: [this.row.data ? _moment(this.row.data.loyaltyStartDate, 'DD-MM-YYYY') : ''],
      // loyaltyEndDate: [this.row.data ? _moment(this.row.data.loyaltyEndDate, 'DD-MM-YYYY') : ''],
      loyaltyCode: [this.row.data ? this.row.data.loyaltyCode : '', [Validators.maxLength(100)]],
      loyaltyType: this.formBuilder.group({
        loyaltyTypeId: [this.row.data ? this.row.data.loyaltyType ?
          this.row.data.loyaltyType.loyaltyTypeId : '' : '', [Validators.required]]
      }),
      loyaltyScheme: this.formBuilder.group({
        loyaltySchemeId: [this.row.data ? this.row.data.loyaltyScheme ?
          this.row.data.loyaltyScheme.loyaltySchemeId : '' : '', [Validators.required]]
      })
    });

    this.adminBaseService.requestSubmit('ADM_LIST_LOYALTY_TYPE', null).subscribe((response) => {

      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.loyaltyList = response.result.data;
          }
        }
      }
      this.adminBaseService.requestSubmit('ADM_LIST_LOYALTY_SCHEME', null).subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.SchemeList = response.result.data;
            }
          }
        }

        this.subscriptions.push(this.dropDownService.getMerchant('ADM_LIST_MERCHANTS').subscribe((response) => {
          if (response) {
            if (response.result) {
              if (response.result.status === 'SUCCESS') {
                this.merchantList = response.result.data;
                if (this.row.data) {
                  this.merchantSelectionChange(this.row.data.merchantId, false);
                }
              }
            }
          }
        }));
      });
    });


  }
  get eform(): any { return this.form.controls; }

  onSubmit(): any {

    const action = this.row.data ? 'Edit' : 'New';
    if (this.form.invalid) {
      return false;
    }

    const formData = this.form.value;
    // formData.loyaltyStartDate = this.form.get('loyaltyStartDate').value.format('DD-MM-YYYY');
    // formData.loyaltyEndDate = this.form.get('loyaltyEndDate').value.format('DD-MM-YYYY');

    this.manageGridService.addORupdateRowData(ModuleKeyModel.loyalityRule.key, this.row.data ? false : true, formData)
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

  merchantSelectionChange(merchantId, clearBranchData: boolean = true): any {
    this.branchList = [];
    if (merchantId) {
      if (clearBranchData) {
        this.form.get('branchId').setValue('');
      }
      const param = {
        filter: `merchantBean.merchantId==${merchantId}`,
      };
      this.headerService.toggleSpinner(true);
      this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_MERCHANT_BRANCHES', param).subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.branchList = response.result.data;
            }
          }
          this.headerService.toggleSpinner(false);
        }
      },
        (error: any) => {
          this.headerService.toggleSpinner(false);
          console.log(error);
        }));
    }
  }

}
