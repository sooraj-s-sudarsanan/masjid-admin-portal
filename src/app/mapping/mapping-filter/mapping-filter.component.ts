import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { DropDownService } from 'src/app/core/services/drop-down.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-mapping-filter',
  templateUrl: './mapping-filter.component.html',
  styleUrls: ['./mapping-filter.component.scss']
})
export class MappingFilterComponent implements OnInit, OnDestroy {

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
    this.subscriptions.push(this.dropDownService.getMerchant('ADM_LIST_MERCHANTS').subscribe((response) => {
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
        
      }));
  }

  merchantSelectionChange(merchantId): any {
    this.branchList = [];
    if (merchantId) {
      this.manageGridService.loadFilters$.next(`branch.merchantBean.merchantId==${merchantId}`);
      const param = {
        filter: `merchantBean.merchantId==${merchantId}`,
      };
      this.headerService.toggleSpinner(true);
      this.subscriptions.push(this.dropDownService.getBranch('ADM_LIST_MERCHANT_BRANCHES', param.filter).subscribe((response) => {
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
          
        }));
    }
  }

  branchSelectionChange(branch: any): any {
    if (branch) {
      this.manageGridService.loadFilters$.next(`branch.branchId==${branch.branchId}`);
      const param = {
        filter: `category.categoryId==${branch.merchantBean.category.categoryId}`,
      };
      this.headerService.toggleSpinner(true);
      this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_SERVICE', param).subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
             
            }
          }
        }
      },
        (error: any) => {
          this.headerService.toggleSpinner(false);
          
        }));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
