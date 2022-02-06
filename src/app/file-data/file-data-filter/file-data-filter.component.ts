import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-file-data-filter',
  templateUrl: './file-data-filter.component.html',
  styleUrls: ['./file-data-filter.component.scss']
})
export class FileDataFilterComponent implements OnInit, OnDestroy {

  
  categoryList = [];
  selectedCategory: any;
  subscriptions: Subscription[] = [];

  constructor(
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService,
    private manageGridService: ManageGridService
  ) { }

  ngOnInit(): void {
    this.headerService.toggleSpinner(true);
    this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_FILE_CATEGORY',null).subscribe((response) => {
      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.categoryList = response.result.data;
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

  categorySelectionChange(categoryName): any {

    if (categoryName) {
      this.manageGridService.loadFilters$.next(`fileCategory==${categoryName}`);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
