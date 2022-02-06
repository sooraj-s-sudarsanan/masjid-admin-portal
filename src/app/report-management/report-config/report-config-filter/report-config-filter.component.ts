import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { DropDownService } from 'src/app/core/services/drop-down.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-report-config-filter',
  templateUrl: './report-config-filter.component.html',
  styleUrls: ['./report-config-filter.component.scss']
})
export class ReportConfigFilterComponent implements OnInit, OnDestroy {

  merchantList = [];
  selectedMerchant: any;
  branchList = [];
  selectedBranch: any;
  subscriptions: Subscription[] = [];
  constructor(
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService,
    private manageGridService: ManageGridService,
    public dropDownService: DropDownService
  ) { }

  ngOnInit(): void {
    this.headerService.toggleSpinner(true);
    this.subscriptions.push(this.dropDownService.getMerchant('ADM_LIST_MERCHANTS', null).subscribe((response) => {
      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.merchantList = response.result.data;
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
  merchantSelectionChange(merchantId): any {
    this.branchList = [];
    if (merchantId) {      
      const param = {
        filter: `merchantBean.merchantId==${merchantId}`,
      };
      this.headerService.toggleSpinner(true);
      this.subscriptions.push(this.dropDownService.getBranch('ADM_LIST_MERCHANT_BRANCHES', param.filter).subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.branchList = response.result.data;
              this.manageGridService.loadFilters$.next(`merchantId==${merchantId}`);
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
    if (branch) {    
      this.manageGridService.loadFilters$.next(`branchId==${branch.branchId}`);
     
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
