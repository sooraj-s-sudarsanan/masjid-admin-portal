import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-report-config-grid-action',
  templateUrl: './report-config-grid-action.component.html',
  styleUrls: ['./report-config-grid-action.component.scss']
})
export class ReportConfigGridActionComponent implements OnInit {
  form: FormGroup;
  typeList = [];
  merchantList = [];
  branchList = [];
  subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<ReportConfigGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      reporConfigId: [this.row.data ? this.row.data.reporConfigId : ''],
      merchantId: [this.row.data ? this.row.data.merchantId : ''],
      reportType: this.formBuilder.group({
        reportTypeId: [this.row.data ? this.row.data.reportType ?
          this.row.data.reportType.reportTypeId : '' : '', [Validators.required]]
      }),
      branchId: [this.row.data ? 
        this.row.data.branchId : '' , [Validators.required]],
      reportEnbleStatus: [this.row.data ? this.row.data.reportEnbleStatus == 'true' ? true : false : ''],
    });
    this.headerService.toggleSpinner(true);
    this.adminBaseService.requestSubmit('ADM_LIST_REPORT_TYPE', null).subscribe((response) => {

      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.typeList = response.result.data;

            // Load Merchant
            this.adminBaseService.requestSubmit('ADM_LIST_MERCHANTS', null).subscribe((response) => {

              if (response) {
                if (response.result) {
                  if (response.result.status === 'SUCCESS') {
                    this.merchantList = response.result.data;
                    this.headerService.toggleSpinner(false);
                    if (this.row) {
                      if (this.row.data) {
                        this.merchantSelectionChange(this.row.data.merchantId);                       
                      }
                    }
                  }
                }
              }
            },err=>{
              this.headerService.toggleSpinner(false);
            });
          }
        }
      }
    },err=>{
      this.headerService.toggleSpinner(false);
    });
  }


  get eform(): any { return this.form.controls; }

  onSubmit(): any {

    const action = this.row.data ? 'Edit' : 'New';
    if (this.form.invalid) {
      return false;
    }

    const formData = this.form.value;
    console.log(formData)
    this.manageGridService.addORupdateRowData(ModuleKeyModel.reportConfig.key, this.row.data ? false : true, formData)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              response.result.data.branchName=this.branchList.find(x=>x.branchId==response.result.data.branchId)?.branchName;
              response.result.data.merchantName=this.merchantList.find(x=>x.merchantId==response.result.data.merchantId)?.merchantName
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.reportConfig.name} ${this.row.data ? 'edited' : 'created'} successfully`);
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


  merchantSelectionChange(merchantId): any {
    this.branchList = [];
    if (merchantId) {
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
