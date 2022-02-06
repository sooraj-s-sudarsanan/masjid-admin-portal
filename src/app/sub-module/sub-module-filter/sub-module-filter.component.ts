import { Component, OnInit } from '@angular/core';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-sub-module-filter',
  templateUrl: './sub-module-filter.component.html',
  styleUrls: ['./sub-module-filter.component.scss']
})
export class SubModuleFilterComponent implements OnInit {

  moduleList: any;
  selectedModule: any;

  constructor(
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService,
    private manageGridService: ManageGridService
  ) { }

  ngOnInit(): void {
    this.headerService.toggleSpinner(true);
    this.adminBaseService.requestSubmit('ADM_LIST_MODULE', null).subscribe((response) => {
      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.moduleList = response.result.data;
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
  selectionChange(module: any): any {
    if (module) {
      this.manageGridService.loadFilters$.next(`modules.moduleId==${module.moduleId}`);
    }
  }

}
