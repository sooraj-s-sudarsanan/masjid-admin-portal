import { Component, Inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
import { TaxServiceMappingDeleteComponent } from '../tax-service-mapping-delete/tax-service-mapping-delete.component';

@Component({
  selector: 'app-tax-service-mapping-grid-action',
  templateUrl: './tax-service-mapping-grid-action.component.html',
  styleUrls: ['./tax-service-mapping-grid-action.component.scss']
})
export class TaxServiceMappingGridActionComponent implements OnInit, OnDestroy {

  merchantList = [];
  selectedMerchant: any;
  branchList = [];
  selectedBranch: any;
  serviceList = [];
  selectedService: any;
  selectedMerchantText = 'Choose Merchant';
  selectedBranchText = 'Choose Branch';
  selectedServiceText = 'Choose Service';
  serviceMapping: any;
  columns = [];
  taxComponentList = [];

  public isLoaded$ = new BehaviorSubject<boolean>(false);
  subscriptions: Subscription[] = [];

  @ViewChild('selectService', { static: true }) selectServiceTmplt: TemplateRef<any>;
  @ViewChild('mappingAction', { static: true }) mappingActionTmplt: TemplateRef<any>;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<TaxServiceMappingGridActionComponent>,
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
          this.isLoaded$.next(true);
        }
      }
    }));

    this.subscriptions.push(this.isLoaded$.subscribe(loaded => {
      if (loaded) {

        this.columns = [
          { name: 'Select', cellTemplate: this.selectServiceTmplt },
          { name: 'Tax Type', prop: 'taxType.taxTypeName' },
          { name: 'Component Code', prop: 'taxComponentCode' },
          { name: 'Component Name', prop: 'taxComponentName' },
          { name: 'Tax Rate', prop: 'taxRate' },
          { name: 'Valuation Type', prop: 'valuationType' },
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
                    this.merchantSelectionChange(this.row.data.serviceMappingBean.branch.merchantBean.merchantId);
                    this.selectedMerchant = this.row.data.serviceMappingBean.branch.merchantBean.merchantId;
                    this.selectedMerchantText = this.row.data.serviceMappingBean.branch.merchantBean.merchantName;
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

  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }


  merchantSelectionChange(merchantId): any {
    this.branchList = [];
    this.serviceList = [];
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
                  this.branchSelectionChange(this.row.data.serviceMappingBean.branch.branchId);
                  this.selectedBranch = this.row.data.serviceMappingBean.branch.branchId;
                  this.selectedBranchText = this.row.data.serviceMappingBean.branch.branchName;
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
                    this.serviceSelectionChange(this.row.data.serviceMappingBean.serviceMappingId);
                    this.selectedService = this.row.data.serviceMappingBean.serviceMappingId;
                    this.selectedServiceText = this.row.data.serviceMappingBean.services.serviceName;
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
    if (serviceId) {
      setTimeout(() => {
        this.headerService.toggleSpinner(true);
      }, 100);
      this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_TAX_COMPONENT', null).subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              if (response.result.data.length > 0) {
                this.taxComponentList = response.result.data;
                this.taxComponentList.map(x => {
                  x.selected = false,
                    x.type = 'new',
                    x.taxServiceMappingId = null
                });
                // Get Mapped tax List here
                let param = {
                  filter: `serviceMappingBean.serviceMappingId==${serviceId}`,
                };
                this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_TAX_SERVICE_MAPPING', param).subscribe((taxResponse) => {

                  if (taxResponse.result) {
                    if (taxResponse.result.status === 'SUCCESS') {

                      this.taxComponentList.forEach(item => {
                        const find = taxResponse.result.data.find(x => x.taxComponent.taxComponentId == item.taxComponentId);
                        if (find) {
                          item.type = "edit"
                          item.selected = true;
                          item.taxServiceMappingId = find.taxServiceMappingId;
                        }
                      })
                    }
                  }
                }
                ));



                // this.mappingRow = response.result.data[0].servicePerson;
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

  cancel(event): any {
    this.dialogRef.close({ action: 'Reload' });
  }

  submit(event): any {
    let listToProcess = [];
    this.taxComponentList.forEach(item => {

      if (item.selected && item.type == 'new' &&
        this.selectedService && this.selectedBranch) {

        const serviceItem = {
          serviceMappingBean: {
            serviceMappingId: this.selectedService
          },
          taxComponent: {
            taxComponentId: item.taxComponentId
          },
        };
        listToProcess.push(serviceItem);
      }
    });
    const action = this.row.data ? 'Edit' : 'New';
    if (listToProcess.length > 0) {
      const param = {
        listToProcess
      };
      this.headerService.toggleSpinner(true);
      this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_ADD_TAX_SERVICE_MAPPING', param).subscribe((response) => {
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

  removeMapping(data) {
    if (data) {
      const actionDialogRef = this.dialog.open(TaxServiceMappingDeleteComponent, {
        disableClose: true,
        width: '500px',
        maxHeight: '90vh',
        data: { data }
      });
      actionDialogRef.afterClosed().subscribe(result => {

        if (result) {
          if (result && result.taxComponentId) {
            const index = this.taxComponentList.findIndex(x => x.taxComponentId === result.taxComponentId);
            if (index > -1) {
              this.taxComponentList[index].selected = false;
              this.taxComponentList[index].type = 'new';
              this.taxComponentList[index].taxServiceMappingId = null;
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
