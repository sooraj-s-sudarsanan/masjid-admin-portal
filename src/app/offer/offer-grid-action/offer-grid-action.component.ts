import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';
import * as _moment from 'moment';
import { DropDownService } from 'src/app/core/services/drop-down.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offer-grid-action',
  templateUrl: './offer-grid-action.component.html',
  styleUrls: ['./offer-grid-action.component.scss']
})
export class OfferGridActionComponent implements OnInit {

  form: FormGroup;
  offerTypeList: any;
  minDate = new Date().setDate(new Date().getDate() - 1);
  merchantList = [];
  branchList = [];
  subscriptions: Subscription[] = [];
  serviceList = [];
  selectedOfferTypeName: any;
  

  constructor(
    public dialogRef: MatDialogRef<OfferGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService,
    public dropDownService: DropDownService
  ) { }

  ngOnInit(): void {

    var dt = new Date();
    var NoOfDays = -1;
    dt.setDate(dt.getDate() + NoOfDays);
    this.form = this.formBuilder.group({
      merchantId: [this.row.data ? this.row.data.branch ? this.row.data.branch.merchantBean.merchantId : '' : '', [Validators.required]],
      branch: this.formBuilder.group({
        branchId: [this.row.data ? this.row.data.branch ? this.row.data.branch.branchId : '' : '', [Validators.required]]
      }),
      offerName: [this.row.data ? this.row.data.offerName : '', [Validators.required, Validators.maxLength(100)]],
      offerNameAR: [this.row.data ? this.row.data.offerNameAR : '', [Validators.required, Validators.maxLength(100)]],
      offerDesc: [this.row.data ? this.row.data.offerDesc : '', [Validators.maxLength(1000)]],
      offerDescAR: [this.row.data ? this.row.data.offerDescAR : '', [Validators.maxLength(1000)]],
      offerType: this.formBuilder.group({
        offerTypeId: [this.row.data ? this.row.data.offerType ? this.row.data.offerType.offerTypeId : '' : '', [Validators.required]]
      }),
      offerValue: [this.row.data ? this.row.data.offerValue : ''],
      offerOtherService: [this.row.data ? this.row.data.offerOtherService : ''],
      offerStartDate: [this.row.data ? _moment(this.row.data.offerStartDate, 'DD-MM-YYYY') : '', [Validators.required]],
      offerEndDate: [this.row.data ? _moment(this.row.data.offerEndDate, 'DD-MM-YYYY') : '', [Validators.required]],
      offerId: [this.row.data ? this.row.data.offerId : ''],
    });

    this.headerService.toggleSpinner(true);

    // Get all Categories
    this.headerService.toggleSpinner(true);
    this.adminBaseService.requestSubmit('ADM_LIST_OFFERTYPE', null).subscribe((response) => {
      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.offerTypeList = response.result.data;
          }
        }
        this.dropDownService.getMerchant('ADM_LIST_MERCHANTS').subscribe((response) => {
          if (response) {
            if (response.result) {
              if (response.result.status === 'SUCCESS') {
                this.merchantList = response.result.data;
                if (this.row && this.row.data && this.row.data.branch) {
                  this.merchantSelectionChange(this.row.data.branch.merchantBean.merchantId);
                }
              }
            }
            this.headerService.toggleSpinner(false);
          }
        },
          (error: any) => {
            this.headerService.toggleSpinner(false);

          });
      }
    },
      (error: any) => {
        this.headerService.toggleSpinner(false);

      });


  }
  get eform(): any { return this.form.controls; }

  merchantSelectionChange(merchantId): any {
    this.branchList = [];
    if (merchantId) {
      const param = {
        filter: `merchantBean.merchantId==${merchantId}`,
      };
      setTimeout(() => {

        this.headerService.toggleSpinner(true);
      }, 100);
      this.adminBaseService.requestSubmit('ADM_LIST_MERCHANT_BRANCHES', param).subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.branchList = response.result.data;
              if (this.row && this.row.data) {
                this.branchSelectionOnChange(this.row.data.branch.branchId);
              }
            }
          }
          this.headerService.toggleSpinner(false);
        }
      },
        (error: any) => {
          this.headerService.toggleSpinner(false);

        });
    }
  }

  branchSelectionOnChange(branchId) {
    if (branchId) {
      setTimeout(() => {
        this.headerService.toggleSpinner(true);
      }, 100);
      let param = {
        filter: `branch.branchId==${branchId}`,
      };
      this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_SERVICE_MAPPING', param).subscribe((mappingResp) => {
        if (mappingResp) {
          if (mappingResp && mappingResp.result.status === 'SUCCESS') {
            if (mappingResp.result.data) {
              this.serviceList = mappingResp.result.data;
            }
            if (this.row && this.row.data) {
              this.offerTypeChange(this.row.data.offerType.offerTypeId);
            }
          }
        }
        this.headerService.toggleSpinner(false);
      },
        (error: any) => {
          this.headerService.toggleSpinner(false);

        }));
    }
  }

  offerTypeChange(typeId) {
    if (typeId) {
      this.selectedOfferTypeName = this.offerTypeList.find(x => x.offerTypeId == typeId).offerTypeName
      if (this.selectedOfferTypeName == 'Percentage Offer') {
        this.form.get('offerValue').setValidators([Validators.required,Validators.max(100)]);    
        this.form.get('offerValue').updateValueAndValidity();

        this.form.get('offerOtherService').setValidators([]);
        this.form.get('offerOtherService').setValue('');
        this.form.get('offerOtherService').updateValueAndValidity();

      } else if (this.selectedOfferTypeName == 'Comobo Offer') {
        this.form.get('offerOtherService').setValidators([Validators.required]);      
        this.form.get('offerOtherService').updateValueAndValidity();

        this.form.get('offerValue').setValidators([]);
        this.form.get('offerValue').setValue('');
        this.form.get('offerValue').updateValueAndValidity();
      }
    }
  }
  onSubmit(): any {

    const action = this.row.data ? 'Edit' : 'New';
    if (this.form.invalid) {
      this.alertService.open
        (ResponseStatusModel.ERROR, `Please check mandatory fields or invalid values`);
      return false;
    }

    const formData = this.form.value;
    formData.offerStartDate = this.form.get('offerStartDate').value.format('DD-MM-YYYY');
    formData.offerEndDate = this.form.get('offerEndDate').value.format('DD-MM-YYYY');
    this.manageGridService.addORupdateRowData(ModuleKeyModel.offer.key, this.row.data ? false : true, this.form.value)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.offer.name} ${this.row.data ? 'edited' : 'created'} successfully`);
            }
          }
        }
      },
        (error: any) => {

        });
  }
  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }
}
