import { Component, OnInit, Input, ViewChild, TemplateRef, OnDestroy, ViewContainerRef, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { MatDialog } from '@angular/material/dialog';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';
import { ManageGridModel } from 'src/app/core/model/manage-grid-model';
import { InitializeModel } from 'src/app/core/model/initialize-model';
import { InitializeService } from 'src/app/core/services/initialize.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { HeaderService } from 'src/app/core/services/header.service';
import { ResponseStatusModel } from '../model/response-status-model';
import { CommonService } from '../services/common.service';
import { ModuleKeyModel } from '../model/module-key-model';


@Component({
  selector: 'app-manage-grid',
  templateUrl: './manage-grid.component.html',
  styleUrls: ['./manage-grid.component.scss']
})
export class ManageGridComponent implements OnInit, OnDestroy, AfterViewInit {

  public initLoaded$ = new BehaviorSubject<boolean>(false);
  public initializeData: InitializeModel;

  @Input() inSection: string;
  @Input() inColumns: [];
  @Input() inactionButtons: [];
  @Input() inDialogSize: any;
  @Input() moduleDisplayName: string;
  @Input() inListFilter = null;
  @Input() page = new ManageGridModel();
  @Input() filterSction: any;
  @Input() loadDataInitial = true;
  @ViewChild('dynamicComponent', { static: false, read: ViewContainerRef })
  filterComponent: any;

  rows = [];
  columns = [];
  actionButton = [];
  // page = new ManageGridModel();

  @ViewChild('actionTemplate', { static: false }) actionTemplate: TemplateRef<any>;

  ColumnMode = ColumnMode;
  loadingIndicator = true;
  actionDialogRef: any;
  deleteDialogRef: any;
  detailsDialogRef: any;
  additionalDialogRef: any;
  rowIndex: any;
  newButton: any;
  subscriptions: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    public manageGridService: ManageGridService,
    public initializeService: InitializeService,
    public headerService: HeaderService,
    private componentResolver: ComponentFactoryResolver,
    public commonService: CommonService) {
  }

  ngOnInit(): any {

    this.page.pageNumber = 0;
    this.page.size = 10;
    this.page.filter = this.inListFilter;

    this.page.section = this.inSection;
    this.headerService.toggleSpinner(true);
    this.subscriptions.push(this.initializeService.initializeCompleted$.subscribe((response) => {
      if (response) {
        this.initLoaded$.next(true);
        this.headerService.toggleSpinner(false);
      }
    }));
    this.subscriptions.push(this.initLoaded$.subscribe((response) => {
      if (response) {
        this.initPageLoad();
        this.setPage({ offset: 0 });
      }
    }));

    this.subscriptions.push(this.manageGridService.loadFilters$.subscribe(filter => {
      if (filter) {
        if (filter === 'CLEAR') {
          this.inListFilter = null;
          return false;
        }
        if (this.inListFilter) {
          this.page.filter = `${this.inListFilter}##${filter}`;
        } else {
          this.page.filter = filter;
        }
        this.setPage({ offset: 0 });
      } else {
        if (this.inListFilter) {
          this.page.filter = this.inListFilter;
        } else {
          this.page.filter = filter;
        }
      }
    }));

  }
  ngAfterViewInit(): void {
    if (this.filterSction) {
      const factory = this.componentResolver.resolveComponentFactory(this.filterSction);
      this.filterComponent.createComponent(factory);
    }
  }

  setPage(pageInfo): any {
    this.loadingIndicator = true;
    this.page.pageNumber = pageInfo.offset;

    if (this.loadDataInitial) {
      this.subscriptions.push(this.manageGridService.getRowData(this.page).subscribe(response => {

        if (response) {
          if (response.result.status === ResponseStatusModel.SUCCESS) {
            if (response.result) {
              if (response.result.data) {
                this.page.totalElements = +response.result.recordCount;
                if (response.result.data) {
                  if (this.inSection == ModuleKeyModel.adminUserManagement.key) {
                    response.result.data.forEach(element => {
                      element.fullName = this.commonService.decryptor(element.fullName);
                      element.mobileNo = this.commonService.decryptor(element.mobileNo);
                      element.email = this.commonService.decryptor(element.email);

                    });
                  }                
                  this.rows = [...response.result.data];
                }
              }
            }
          }
        }
        this.loadingIndicator = false;
      }));
    } else {
      this.loadingIndicator = false;
    }
  }

  initPageLoad(): any {
    this.columns = this.inColumns;

    // Remove New from array & create new object
    let actionButtonTmp = [];
    actionButtonTmp = this.inactionButtons;
    this.newButton = actionButtonTmp.find(x => x.type === 'New');
    if (this.newButton) {
      const index = actionButtonTmp.indexOf(this.newButton, 0);
      if (index > -1) {
        actionButtonTmp.splice(index, 1);
      }
    }
    this.actionButton = actionButtonTmp;

    if (this.actionButton.length > 0) {

      const actionColumn = { name: '', cellTemplate: this.actionTemplate,  width: this.inSection == ModuleKeyModel.appointment.key?200:50 };
      this.columns.push(actionColumn);
    }

    // Get row data

    // this.manageGridService.getRowData(this.page).subscribe((response) => {

    //   if (response) {
    //     if (response.result) {
    //       if (response.result.data) {
    //         if (response.result.data.LIST) {
    //           this.rows = [...response.result.data.LIST];
    //         }
    //       }
    //     }
    //   }
    //   this.loadingIndicator = false;
    // },
    //   (error: any) => {
    //     console.log(error);
    //   });



    // this.fetch(data => {

    //   if (this.inSection === 'faq') {
    //     this.rows = data;
    //   } else if (this.inSection === 'menu' || this.inSection === 'role') {
    //     this.rows = data.data.LIST;
    //   }
    //   setTimeout(() => {
    //     this.loadingIndicator = false;
    //   }, 1500);
    // });
  }
  onSort(event): any {

    this.loadingIndicator = true;
    const sort = event.sorts[0];
    this.page.sortBy = sort.prop;
    this.page.sortOrder = sort.dir;

    this.subscriptions.push(this.manageGridService.getRowData(this.page).subscribe(response => {

      if (response) {
        if (response.result.status === ResponseStatusModel.SUCCESS) {
          if (response.result) {
            if (response.result.data) {
              this.page.totalElements = +response.result.recordCount;
              if (response.result.data) {
                if (this.inSection == ModuleKeyModel.adminUserManagement.key) {
                  response.result.data.forEach(element => {
                    element.fullName = this.commonService.decryptor(element.fullName);
                    element.mobileNo = this.commonService.decryptor(element.mobileNo);
                    element.email = this.commonService.decryptor(element.email);

                  });
                }
                this.rows = [...response.result.data];
              }
            }
          }
        }
      }
      this.loadingIndicator = false;
    }));
  }

  // fetch(cb) {
  //   const req = new XMLHttpRequest();
  //   if (this.inSection === 'faq') {
  //     req.open('GET', `assets/company.json`);
  //   } else if (this.inSection === 'menu') {
  //     req.open('GET', `assets/module.json`);
  //   } else if (this.inSection === 'role') {
  //     req.open('GET', `assets/role.json`);
  //   }
  //   req.onload = () => {
  //     cb(JSON.parse(req.response));
  //   };
  //   req.send();
  // }

  // Check button visibility



  // Button actions

  // EDIT
  openEditDialog(dialogComponent: any, row: any, rowIndex: any): void {

    this.rowIndex = rowIndex;
    this.actionDialogRef = this.dialog.open(dialogComponent, {
      panelClass: 'custom-modal',
      disableClose: false,
      width: this.inDialogSize ? this.inDialogSize.width : '500px',
      // height: this.inDialogSize ? this.inDialogSize.height : '500px',
      maxHeight: '90vh',
      data: { data: row }
    });

    this.actionDialogRef.afterClosed().subscribe(result => {

      this.loadingIndicator = true;
      if (result) {
        if (result !== 'NO') {
          if (result.action === 'Edit') {
            if (result.rowValue) {
              this.rows = this.rows.filter((value, key) => {
                if (key === this.rowIndex) {
                  value = result.rowValue;
                }
                return true;
              });
              this.rows[rowIndex] = result.rowValue;
            }
          } else if (result.action === 'New') {
            this.page.totalElements = +this.page.totalElements + 1;
            if (result.rowValue) {
              this.rows = [result.rowValue, ...this.rows];
            }
          } else if (result.action === 'Delete') {
            this.page.totalElements = +this.page.totalElements - 1;
            this.rows = this.rows.filter((value, key) => {
              return key !== this.rowIndex;
            });
          }
          else if (result.action === 'Reload') {
            this.setPage({ offset: 0 });
          }
        }
      }
      this.loadingIndicator = false;
    });
  }


  ngOnDestroy(): void {
    this.page.filter = null;
    this.manageGridService.loadFilters$.next(null);

    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.actionDialogRef) {
      this.actionDialogRef.close();
    }
  }

}


