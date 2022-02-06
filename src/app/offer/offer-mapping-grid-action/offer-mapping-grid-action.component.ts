import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectionType } from '@swimlane/ngx-datatable';
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

@Component({
  selector: 'app-offer-mapping-grid-action',
  templateUrl: './offer-mapping-grid-action.component.html',
  styleUrls: ['./offer-mapping-grid-action.component.scss']
})
export class OfferMappingGridActionComponent implements OnInit {


  @ViewChild('selectService', { static: true }) selectServiceTmplt: TemplateRef<any>;
  @ViewChild('byPerson', { static: true }) byPeronTmplt: TemplateRef<any>;
  @ViewChild('action', { static: true }) actionTmplt: TemplateRef<any>;
  @ViewChild('bookingAllowed', { static: true }) bookingAllowedTmplt: TemplateRef<any>;
  @ViewChild('startTime', { static: true }) startTimeTmplt: TemplateRef<any>;
  @ViewChild('endTime', { static: true }) endTimeTmplt: TemplateRef<any>;
  @ViewChild('duration', { static: true }) durationTmplt: TemplateRef<any>;

  merchantList = [];
  selectedMerchant: any;
  branchList = [];
  selectedBranch: any;
  action = 'Add';

  SelectionType = SelectionType;
  serviceList = [];
  columns = [];
  selectedMerchantText = 'Choose Merchant';
  selectedBranchText = 'Choose Branch';

  public isLoaded$ = new BehaviorSubject<boolean>(false);
  subscriptions: Subscription[] = [];
  userInfo: any;

  timePattern = new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]\s?[AaPp][Mm]$');
  offerList: any;

  constructor(
    public dialogRef: MatDialogRef<OfferMappingGridActionComponent>,
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
          { name: 'Offer', cellTemplate: this.byPeronTmplt },
          { name: '', cellTemplate: this.actionTmplt, width: 50 }
        ];
        this.headerService.toggleSpinner(true);
        this.subscriptions.push(this.dropDownService.getMerchant('ADM_LIST_MERCHANTS', null).subscribe((response) => {
          if (response) {
            if (response.result) {
              if (response.result.status === 'SUCCESS') {
                this.merchantList = response.result.data;

                if (this.row) {
                  if (this.row.data) {
                    this.merchantSelectionChange(this.row.data.branch.merchantBean.merchantId);
                    this.selectedMerchant = this.row.data.branch.merchantBean.merchantId;
                    this.selectedMerchantText = this.row.data.branch.merchantBean.merchantName;
                  }
                }
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
    }));

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

              if (this.row) {
                if (this.row.data) {
                  this.branchSelectionChange(this.row.data.branch.branchId);
                  this.selectedBranch = this.row.data.branch.branchId;
                  this.selectedBranchText = this.row.data.branch.branchName;
                }
              }
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
  branchSelectionChange(branch: any): any {
    this.serviceList = [];
    if (branch && this.branchList) {
      const branchInfo = this.branchList.find(x => x.branchId == branch);
      if (branchInfo) {
        this.headerService.toggleSpinner(true);
        // check if exist
        let param = {
          filter: `branch.branchId==${branch}`,
        };
        this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_SERVICE_MAPPING', param).subscribe((mappingResp) => {
          if (mappingResp) {
            if (mappingResp && mappingResp.result.status === 'SUCCESS') {
              if (mappingResp.result.data) {
                this.serviceList = mappingResp.result.data;
                
              }
            }
          }
          // Call Offer service
          let param = {
            filter: `branch.branchId==${this.selectedBranch}`,
          };
          this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_OFFER', param).subscribe((offrResponse) => {
            if (offrResponse) {
              if (offrResponse && offrResponse.result.status === 'SUCCESS') {
                if (offrResponse.result.data) {
                  this.offerList = offrResponse.result.data;
                }
              }
            }
            this.headerService.toggleSpinner(false);
          }));
        }));

      }
    }
  }

  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }

  submit(data): any {

    if (data) {     
      this.manageGridService.addORupdateRowData(ModuleKeyModel.mapping.key, false, data)
        .subscribe((response) => {
          if (response) {
            if (response.result) {
              if (response.result.status === 'SUCCESS') {
                this.dialogRef.close({ action: 'Reload' });
                this.alertService.open
                  (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.offerMapping.name} updated successfully`);
              }
            }
          }
        },
          (error: any) => {

          });
    }
  }
  offerSelectionChange(value, row) {

    if (this.offerList.length > 0 && this.serviceList.length > 0 && row) {
      var mappedService = this.serviceList.find(x => x.services.serviceId == row.services.serviceId);
      const offer = this.offerList.find(x => x.offerId == value);
      if (mappedService) {
        mappedService.offers = offer;
      }
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
