import { Component, OnInit } from '@angular/core';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {
  networkList: any;
  selectedNetwork: any;

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
      
      });
  }
  networkSelectionChange(network: any): any {
    if (network) {
      this.manageGridService.loadFilters$.next(`networkType.networkId==${network.networkId}`);
    }
  }
}
