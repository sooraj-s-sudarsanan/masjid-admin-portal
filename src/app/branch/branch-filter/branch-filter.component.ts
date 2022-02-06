import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { DropDownService } from 'src/app/core/services/drop-down.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-branch-filter',
  templateUrl: './branch-filter.component.html',
  styleUrls: ['./branch-filter.component.scss']
})
export class BranchFilterComponent implements OnInit {

  merchantList: any;
  selectedMerchant: any;

  subscriptions: Subscription[] = [];

  constructor(
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService,
    private manageGridService: ManageGridService,
    public dropDownService: DropDownService) { }

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
     
      }));
  }
  merchnatSelectionChange(merchant: any): any {
    if (merchant) {
      this.manageGridService.loadFilters$.next(`merchantBean.merchantId==${merchant.merchantId}`);
    }
  }
}
