import { Component, Inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { DropDownService } from 'src/app/core/services/drop-down.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { InitializeService } from 'src/app/core/services/initialize.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';
import { LoyalityRuleMappingDeleteComponent } from '../loyality-rule-mapping-delete/loyality-rule-mapping-delete.component';
import { LoyalityRuleMappingEditComponent } from '../loyality-rule-mapping-edit/loyality-rule-mapping-edit.component';
import * as _moment from 'moment';

@Component({
  selector: 'app-loyality-rule-mapping-grid-action',
  templateUrl: './loyality-rule-mapping-grid-action.component.html',
  styleUrls: ['./loyality-rule-mapping-grid-action.component.scss']
})
export class LoyalityRuleMappingGridActionComponent implements OnInit, OnDestroy {

  merchantList = [];
  selectedMerchant: any;
  branchList = [];
  selectedBranch: any;
  serviceList = [];
  selectedService: any;
  columns = [];
  mappingList: any;
  form: FormGroup;
  categoryId: any;
  selectedMerchantText = 'Choose Merchant';
  selectedBranchText = 'Choose Branch';
  selectedServiceText = 'Choose Service';
  mappingRow = null;

  public isLoaded$ = new BehaviorSubject<boolean>(false);
  subscriptions: Subscription[] = [];
  userInfo: any;
  serviceMapping: any;

  @ViewChild('selectService', { static: true }) selectServiceTmplt: TemplateRef<any>;
  @ViewChild('loyaltyRuleName', { static: true }) loyaltyRuleNameTmplt: TemplateRef<any>;
  @ViewChild('loyaltyRuleCode', { static: true }) loyaltyRuleCodeTmplt: TemplateRef<any>;
  @ViewChild('rewardPointStartDate', { static: true }) startTimeTmplt: TemplateRef<any>;
  @ViewChild('rewardPointEndDate', { static: true }) endTimeTmplt: TemplateRef<any>;
  @ViewChild('servicePrice', { static: true }) servicePriceTmplt: TemplateRef<any>;
  @ViewChild('rewardPointApplicable', { static: true }) rewardPointApplicableTmplt: TemplateRef<any>;
  @ViewChild('mappingAction', { static: true }) mappingActionTmplt: TemplateRef<any>;
  loyaltyRules: any = [];

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<LoyalityRuleMappingGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService,
    public alertService: AlertService,
    public dropDownService: DropDownService,
    public authService: AuthenticationService,
    public initializeService: InitializeService
  ) { }

  ngOnInit(): void {

    this.headerService.toggleSpinner(true);
    this.subscriptions.push(this.initializeService.initializeCompleted$.subscribe((response) => {
      if (response) {

        if (this.authService.userInfo) {
          this.userInfo = this.authService.userInfo;
          this.isLoaded$.next(true);
        }
      }
    }));

    this.subscriptions.push(this.isLoaded$.subscribe(loaded => {
      if (loaded) {

        this.columns = [
          { name: 'Select', cellTemplate: this.selectServiceTmplt },
          { name: 'Rule Name', cellTemplate: this.loyaltyRuleNameTmplt },
          { name: 'Rule Code', cellTemplate: this.loyaltyRuleCodeTmplt },
          { name: 'Start Time', cellTemplate: this.startTimeTmplt },
          { name: 'End Time', cellTemplate: this.endTimeTmplt },
          { name: 'Price', cellTemplate: this.servicePriceTmplt },
          { name: 'Point Applicable', cellTemplate: this.rewardPointApplicableTmplt },
          { name: '', cellTemplate: this.mappingActionTmplt }
        ];

        this.headerService.toggleSpinner(true);
        this.subscriptions.push(this.dropDownService.getMerchant('ADM_LIST_MERCHANTS', null).subscribe((response) => {
          if (response) {
            if (response.result) {
              if (response.result.status === 'SUCCESS') {
                this.merchantList = response.result.data;

                if (this.row) {
                  if (this.row.data) {
                    this.merchantSelectionChange(this.row.data.merchantId);
                    this.selectedMerchant = this.row.data.merchantId;
                    this.selectedMerchantText = this.row.data.merchantName;
                  }
                }
              }
            }
            this.headerService.toggleSpinner(false);
          }
        },
          (error: any) => {
            this.headerService.toggleSpinner(false);

          }));
      }
    }));

  }
  get eform(): any { return this.form.controls; }
  merchantSelectionChange(merchantId): any {
    this.branchList = [];
    this.serviceList = [];
    this.mappingList = [];
    this.mappingRow = [];
    this.loyaltyRules = [];

    if (merchantId) {
      const param = {
        filter: `merchantBean.merchantId==${merchantId}`,
      };
      setTimeout(() => {
        this.headerService.toggleSpinner(true);
      }, 100);
      this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_MERCHANT_BRANCHES', param).subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.branchList = response.result.data;
              if (this.row) {
                if (this.row.data) {
                  this.branchSelectionChange(this.row.data.branchId);
                  this.selectedBranch = this.row.data.branchId;
                  this.selectedBranchText = this.row.data.branchName;
                }
              }
            }
          }
          this.headerService.toggleSpinner(false);
        }
      },
        (error: any) => {
          this.headerService.toggleSpinner(false);

        }));
    }
  }
  branchSelectionChange(branch): any {

    this.serviceList = [];
    this.mappingList = [];
    this.mappingRow = [];
    this.loyaltyRules = [];

    if (branch) {
      const branchInfo = this.branchList.find(x => x.branchId == branch);
      if (branchInfo) {
        const param = {
          filter: `branch.branchId==${branchInfo.branchId}`,
        };
        setTimeout(() => {
          this.headerService.toggleSpinner(true);
        }, 100);
        this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_SERVICE_MAPPING', param).subscribe((response) => {
          if (response) {
            if (response.result) {
              if (response.result.status === 'SUCCESS') {
                this.serviceList = response.result.data;
                if (this.row) {
                  if (this.row.data) {
                    this.serviceSelectionChange(this.row.data.serviceMappingId);
                    this.selectedService = this.row.data.serviceMappingId;
                    this.selectedServiceText = this.row.data.serviceName;
                    // this.categoryId = branchInfo.merchantBean.category.categoryId;
                  }
                }
              }
            }
            this.headerService.toggleSpinner(false);
          }
        },
          (error: any) => {
            this.headerService.toggleSpinner(false);

          }));
      }
    }
  }

  serviceSelectionChange(serviceId): any {
    this.mappingRow = [];
    this.mappingList = [];

    if (serviceId) {
      let param = {
        filter: `serviceMappingId==${serviceId}`,
      };
      setTimeout(() => {
        this.headerService.toggleSpinner(true);
      }, 100);
      this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_SERVICE_MAPPING', param).subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {

              if (response.result.data.length > 0) {
                this.serviceMapping = response.result.data[0];
              }

              this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_LOYALTY_RULE', null).subscribe((response) => {
                if (response) {
                  if (response.result) {
                    if (response.result.status === 'SUCCESS') {
                      const _this = this;
                      this.loyaltyRules = response.result.data.filter(function (x) { return x.branchId == _this.selectedBranch || x.merchantId == _this.selectedMerchant; });
                      if (this.loyaltyRules.length == 0) {
                        this.loyaltyRules = response.result.data.filter(function (x) { return x.branchId == null && x.merchantId == null; });
                      }

                      this.loyaltyRules.map(x => {
                        x.selected = false,
                          x.branchId = null,
                          x.serviceId = null,
                          x.serviceMappingId = null,
                          x.rewardPointStartDate = null,
                          x.rewardPointEndDate = null,
                          x.servicePrice = this.serviceMapping.servicePrice,
                          x.rewardPointApplicable = null,
                          x.loyaltyRule = {},
                          x.type = 'new',
                          x.loyaltyRuleMappingId = null
                      });
                      param = {
                        filter: `serviceMappingId==${serviceId}`,
                      };
                      this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_LOYALTY_RULE_MAPPING', param).subscribe((response) => {
                        if (response) {
                          if (response.result) {
                            if (response.result.status === 'SUCCESS' && this.loyaltyRules.length) {

                              response.result.data.forEach(element => {
                                if (element && element.loyaltyRule) {
                                  const find = this.loyaltyRules.find(x => x.loyaltyRuleId == element.loyaltyRule.loyaltyRuleId);
                                  if (find) {
                                    find.loyaltyRuleMappingId = element.loyaltyRuleMappingId;
                                    find.rewardPointStartDate = element.rewardPointStartDate;
                                    find.rewardPointEndDate = element.rewardPointEndDate;
                                    find.servicePrice = element.servicePrice;
                                    find.rewardPointApplicable = element.rewardPointApplicable;
                                    find.loyaltyRule = response.result.data;
                                    find.branchId = element.branchId;
                                    find.serviceId = element.serviceId;
                                    find.serviceMappingId = element.serviceMappingId;
                                  }
                                }
                              });
                            }
                          }
                        }
                        this.headerService.toggleSpinner(false);
                      }));
                    }
                  }
                }
              }));
            }
          }
          this.headerService.toggleSpinner(false);
        }
      },
        (error: any) => {
          this.headerService.toggleSpinner(false);

        }));

    }
  }

  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }

  cancel(event): any {
    this.dialogRef.close({ action: 'Reload' });
  }

  submit(event): any {
    let listToProcess = [];
    this.loyaltyRules.forEach(item => {

      if (item.selected && item.type == 'new' &&
        this.selectedService && this.selectedBranch) {
        if (item.rewardPointStartDate && item.rewardPointEndDate &&
          item.servicePrice && item.rewardPointApplicable) {

          const find = this.serviceList.find(x => x.serviceMappingId = this.selectedService)?.services.serviceId;

          const serviceItem = {
            branchId: this.selectedBranch,
            serviceId: this.serviceList.find(x => x.serviceMappingId = this.selectedService)?.services.serviceId,
            serviceMappingId: this.selectedService,
            rewardPointStartDate: item.rewardPointStartDate.format('DD-MM-YYYY'),
            rewardPointEndDate: item.rewardPointEndDate.format('DD-MM-YYYY'),
            servicePrice: item.servicePrice,
            rewardPointApplicable: item.rewardPointApplicable,
            loyaltyRule: {
              loyaltyRuleId: item.loyaltyRuleId
            },
            loyaltyCode: item.loyaltyCode
          };
          // if (this.row && this.row.data) {          
          //   serviceItem['serviceMappingId'] = item.serviceMappingId;
          // }
          listToProcess.push(serviceItem);
        } else {
          listToProcess = [];
          if (item.rewardPointStartDate == null || item.rewardPointStartDate === undefined) {
            this.alertService.open(ResponseStatusModel.ERROR, `${item.loyaltyRuleName} loyalty, Start Date is required`);
          } else if (item.rewardPointEndDate == null || item.rewardPointEndDate === undefined) {
            this.alertService.open(ResponseStatusModel.ERROR, `${item.loyaltyRuleName} loyalty, End Date is required`);
          } else if (item.servicePrice == null || item.servicePrice === undefined) {
            this.alertService.open(ResponseStatusModel.ERROR, `${item.loyaltyRuleName} loyalty, Price is required`);
          } else if (item.rewardPointApplicable == null || item.rewardPointApplicable === undefined) {
            this.alertService.open(ResponseStatusModel.ERROR, `${item.loyaltyRuleName} loyalty, Reward Point Applicable is required`);
          }
          return false;
        }
      }
    });
    const action = this.row.data ? 'Edit' : 'New';
    if (listToProcess.length > 0) {
      const param = {
        listToProcess
      };
      this.headerService.toggleSpinner(true);
      this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_ADD_LOYALTY_RULE_MAPPING', param).subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action: 'Reload' });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.loyalityRuleMapping.name} ${this.row.data ? 'edited' : 'created'} successfully`);
            }
          }
          this.headerService.toggleSpinner(false);
        }
      },
        (error: any) => {
          this.headerService.toggleSpinner(false);
        }));
    }
  }

  editMapping(data) {
    if (data) {
      const actionDialogRef = this.dialog.open(LoyalityRuleMappingEditComponent, {
        disableClose: true,
        width: '500px',
        maxHeight: '90vh',
        data: { data }
      });
      actionDialogRef.afterClosed().subscribe(result => {
        if (result.rowValue && result.rowValue?.loyaltyRuleMappingId && this.loyaltyRules.length > 0) {
          const index = this.loyaltyRules.findIndex(x => x.loyaltyRuleMappingId === result.rowValue.loyaltyRuleMappingId);
          if (index > -1) {
            this.loyaltyRules[index].rewardPointStartDate = result.rowValue.rewardPointStartDate;
            this.loyaltyRules[index].rewardPointEndDate = result.rowValue.rewardPointEndDate;
            this.loyaltyRules[index].servicePrice = result.rowValue.servicePrice;
            this.loyaltyRules[index].rewardPointApplicable = result.rowValue.rewardPointApplicable;
          }
        }
      });
    }
  }

  removeMapping(data) {
    if (data) {
      const actionDialogRef = this.dialog.open(LoyalityRuleMappingDeleteComponent, {
        disableClose: true,
        width: '500px',
        maxHeight: '90vh',
        data: { data }
      });
      actionDialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result && result.serviceMappingId) {
            const index = this.loyaltyRules.findIndex(x => x.serviceMappingId === result.serviceMappingId);
            if (index > -1) {
              this.loyaltyRules[index].selected = false;
              this.loyaltyRules[index].rewardPointStartDate = null;
              this.loyaltyRules[index].rewardPointEndDate = null;
              this.loyaltyRules[index].rewardPointApplicable = null;
              this.loyaltyRules[index].loyaltyRule = {};
              this.loyaltyRules[index].type = 'new';
              this.loyaltyRules[index].loyaltyRuleMappingId = null;
              this.loyaltyRules[index].loyaltyCode = null;             
              this.loyaltyRules[index].servicePrice = this.loyaltyRules[index].servicePrice;
            }
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
