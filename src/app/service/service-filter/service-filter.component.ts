import { Component, OnInit } from '@angular/core';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-service-filter',
  templateUrl: './service-filter.component.html',
  styleUrls: ['./service-filter.component.scss']
})
export class ServiceFilterComponent implements OnInit {

  networkList: any;
  selectedNetwork: any;
  categoryList: any;
  selectedCategory: any;

  constructor(
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService,
    private manageGridService: ManageGridService
  ) { }

  ngOnInit(): void {
    this.headerService.toggleSpinner(true);
    this.adminBaseService.requestSubmit('ADM_LIST_NETWORKS', null).subscribe((response) => {
      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.networkList = response.result.data;
          }
        }
        this.headerService.toggleSpinner(false);
      }
    },
      (error: any) => {
        this.headerService.toggleSpinner(false);
        console.log(error);
      });
  }
  networkSelectionChange(network: any): any {
    if (network) {
      this.manageGridService.loadFilters$.next(`category.networkType.networkId==${network.networkId}`);
    }
    const param = {
      filter: `networkType.networkId==${network.networkId}`,
    };
    this.adminBaseService.requestSubmit('ADM_LIST_CATEGORY', param).subscribe((response) => {
      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.categoryList = response.result.data;
          }
        }
      }
    },
      (error: any) => {
        this.headerService.toggleSpinner(false);
        console.log(error);
      });
  }
  categorySelectionChange(category: any): any {
    if (category) {
      this.manageGridService.loadFilters$.next(`category.categoryId==${category.categoryId}`);
    }
  }
}
