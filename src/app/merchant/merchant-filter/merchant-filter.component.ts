import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-merchant-filter',
  templateUrl: './merchant-filter.component.html',
  styleUrls: ['./merchant-filter.component.scss']
})
export class MerchantFilterComponent implements OnInit {

  networkList: any;
  selectedNetwork: any;
  categoryList: any;
  selectedCategory: any;
  @ViewChild("category", {static: false}) categoryRef: ElementRef;
  isFirstRequest=true;

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
    // if (network) {
    //   this.manageGridService.loadFilters$.next(`category.networkType.networkId==${network.networkId}`);
    // }
    const param = {
      filter: `networkType.networkId==${network.networkId}`,
    };
    this.adminBaseService.requestSubmit('ADM_LIST_CATEGORY', param).subscribe((response) => {
      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.categoryList = response.result.data;    
            if(this.categoryList.length>0){
              this.isFirstRequest=false;
              this.selectedCategory=this.categoryList[0]
              this.categorySelectionChange(this.categoryList[0]);
            }       
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
