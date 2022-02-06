import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { DropDownService } from 'src/app/core/services/drop-down.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-service-person-filter',
  templateUrl: './service-person-filter.component.html',
  styleUrls: ['./service-person-filter.component.scss']
})
export class ServicePersonFilterComponent implements OnInit, OnDestroy {

  merchantList = [];
  selectedMerchant: any;
  branchList = [];
  selectedBranch: any;
  serviceList = [];
  selectedService: any;
  categoryList = [];
  selectedCategory: any;

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
          console.log(error);
        }));
    }
  }

  branchSelectionChange(branch: any): any {
    if (branch) {
    
      this.manageGridService.loadFilters$.next(`branch.branchId==${branch.branchId}`);
      this.categoryList = branch.merchantBean.category;
    }
  }

  categorySelectionChange(category: any) {
    if (category) {
      const param = {
        filter: `services.category.categoryId==${category.categoryId}##branch.branchId==${this.selectedBranch.branchId}`,
      };
      this.headerService.toggleSpinner(true);
      this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_SERVICE_MAPPING', param).subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.serviceList = response.result.data;
            }
          }
        }
      },
        (error: any) => {
          this.headerService.toggleSpinner(false);
          console.log(error);
        }));
    }
  }

  serviceSelectionChange(service): any {

    if (service) {
      const filter = `branch.branchId==${this.selectedBranch.branchId}##services.serviceId==${service.serviceId}`;
      this.manageGridService.loadFilters$.next(filter);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
