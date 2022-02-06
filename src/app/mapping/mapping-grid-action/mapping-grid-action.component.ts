import { IfStmt } from '@angular/compiler';
import { Component, Inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectionType } from '@swimlane/ngx-datatable';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { DropDownService } from 'src/app/core/services/drop-down.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { InitializeService } from 'src/app/core/services/initialize.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';
import { IndividualEditComponent } from '../individual-edit/individual-edit.component';
import { MappingDeleteComponent } from '../mapping-delete/mapping-delete.component';

@Component({
  selector: 'app-mapping-grid-action',
  templateUrl: './mapping-grid-action.component.html',
  styleUrls: ['./mapping-grid-action.component.scss']
})
export class MappingGridActionComponent implements OnInit, OnDestroy {

  @ViewChild('selectService', { static: true }) selectServiceTmplt: TemplateRef<any>;
  @ViewChild('byPerson', { static: true }) byPeronTmplt: TemplateRef<any>;
  @ViewChild('bookingAllowed', { static: true }) bookingAllowedTmplt: TemplateRef<any>;
  @ViewChild('allowRepeatedBooking', { static: true }) allowRepeatedBookingTmplt: TemplateRef<any>;
  @ViewChild('startTime', { static: true }) startTimeTmplt: TemplateRef<any>;
  @ViewChild('endTime', { static: true }) endTimeTmplt: TemplateRef<any>;
  @ViewChild('duration', { static: true }) durationTmplt: TemplateRef<any>;
  @ViewChild('price', { static: true }) priceTmplt: TemplateRef<any>;
  @ViewChild('mappingAction', { static: true }) mappingActionTmplt: TemplateRef<any>;

  merchantList = [];
  selectedMerchant: any;
  branchList = [];
  selectedBranch: any;
  categoryList = [];
  selectedCategory: any;
  action = 'Add';

  SelectionType = SelectionType;
  serviceList = [];
  columns = [];
  selectedMerchantText = 'Choose Merchant';
  selectedBranchText = 'Choose Branch';
  selectedCategoryText = 'Choose Category';

  public isLoaded$ = new BehaviorSubject<boolean>(false);
  subscriptions: Subscription[] = [];
  userInfo: any;

  timePattern = new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]\s?[AaPp][Mm]$');

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<MappingGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService,
    public alertService: AlertService,
    public dropDownService: DropDownService,
    public authService: AuthenticationService,
    public initializeService: InitializeService
  ) { }

  ngOnInit(): void {

    this.headerService.toggleSpinner(true);
    this.subscriptions.push(this.initializeService.initializeCompleted$.subscribe((response) => {
      if (response) {

        if (this.authService.userInfo) {
          this.userInfo = this.authService.userInfo;
          this.isLoaded$.next(true);
        }
      }
    }));

    this.subscriptions.push(this.isLoaded$.subscribe(loaded => {
      if (loaded) {

        this.columns = [
          { name: 'Select', cellTemplate: this.selectServiceTmplt },
          { name: 'Booking By Service Person', cellTemplate: this.byPeronTmplt },
          { name: 'No. Booking Allowed', cellTemplate: this.bookingAllowedTmplt },
          { name: 'Repeat Booking', cellTemplate: this.allowRepeatedBookingTmplt },
          { name: 'Start Time', cellTemplate: this.startTimeTmplt },
          { name: 'End Time', cellTemplate: this.endTimeTmplt },
          { name: 'Duration (in min)', cellTemplate: this.durationTmplt },
          { name: 'Price', cellTemplate: this.priceTmplt },
          { name: '', cellTemplate: this.mappingActionTmplt }
        ];
        this.headerService.toggleSpinner(true);
        this.subscriptions.push(this.dropDownService.getMerchant('ADM_LIST_MERCHANTS', null).subscribe((response) => {
          if (response) {
            if (response.result) {
              if (response.result.status === 'SUCCESS') {
                this.merchantList = response.result.data;

                if (this.row) {
                  if (this.row.data) {
                    this.merchantSelectionChange(this.row.data.branch.merchantBean.merchantId);
                    this.selectedMerchant = this.row.data.branch.merchantBean.merchantId;
                    this.selectedMerchantText = this.row.data.branch.merchantBean.merchantName;
                  }
                }
              }
            }
            this.headerService.toggleSpinner(false);
          }
        },
          (error: any) => {
            this.headerService.toggleSpinner(false);

          }));
      }
    }));

  }

  merchantSelectionChange(merchantId): any {
    this.branchList = [];
    if (merchantId) {
      const param = {
        filter: `merchantBean.merchantId==${merchantId}`,
      };
      setTimeout(() => {
        this.headerService.toggleSpinner(true);
      }, 100);
      this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_MERCHANT_BRANCHES', param).subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.branchList = response.result.data;

              if (this.row) {
                if (this.row.data) {
                  this.branchSelectionChange(this.row.data.branch.branchId);
                  this.selectedBranch = this.row.data.branch.branchId;
                  this.selectedBranchText = this.row.data.branch.branchName;
                }
              }
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

    this.serviceList = [];
    if (branch && this.branchList) {
      const branchInfo = this.branchList.find(x => x.branchId == branch);
      if (branchInfo) {
        this.categoryList = branchInfo.merchantBean.category;
        this.selectedBranch = branch;
        if (this.row) {
          if (this.row.data) {
            this.categorySelectionChange(this.row.data.services.category.categoryId);
            this.selectedCategory = this.row.data.services.category.categoryId;
            this.selectedCategoryText = this.row.data.services.category.categoryName;
          }
        }
      }
    }
  }

  categorySelectionChange(category: any) {
    if (category) {
      let param = {
        filter: `category.categoryId==${category}`,
      };
      setTimeout(() => {
        this.headerService.toggleSpinner(true);
      }, 100);
      this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_SERVICE', param).subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              response.result.data.map(x => {
                x.servicePersonLevelBooking = false;
                x.selected = false;
                x.numberOfBookingAllowed = null;
                x.servicePersonAvgDuration = null;
                x.servicePersonEndTime = null;
                x.servicePersonStartTime = null;
                x.servicePrice = null;
                x.allowRepeatedBooking = false;
                x.type = 'new';
              });
              this.serviceList = response.result.data;

            }
          }
          // check if exist
          param = {
            filter: `branch.branchId==${this.selectedBranch}`,
          };
          this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_SERVICE_MAPPING', param).subscribe((mappingResp) => {
            if (mappingResp) {
              if (mappingResp && mappingResp.result.status === 'SUCCESS' && this.serviceList.length > 0) {
                if (mappingResp.result.data) {
                  this.action = 'Edit';
                  mappingResp.result.data.forEach(item => {
                    const find = this.serviceList.find(x => x.serviceId === item.services.serviceId);
                    if (find) {
                      find.selected = true;
                      find.servicePersonLevelBooking = Boolean(JSON.parse(item.servicePersonLevelBooking));
                      find.numberOfBookingAllowed = item.numberOfBookingAllowed;
                      find.servicePersonAvgDuration = item.servicePersonAvgDuration;
                      find.servicePersonEndTime = item.servicePersonEndTime;
                      find.servicePersonStartTime = item.servicePersonStartTime;
                      find.servicePerson = item.servicePerson;
                      find.serviceMappingId = item.serviceMappingId;
                      find.servicePrice = item.servicePrice;
                      find.servicePerson = item.servicePerson;
                      find.offers = item.offers;
                      find.branchId = item.branch.branchId;                     
                      find.allowRepeatedBooking = item.allowRepeatedBooking
                      find.type = 'edit';
                    }
                  });
                }
              }
            }
            this.headerService.toggleSpinner(false);
          }));

        }
      },
        (error: any) => {
          this.headerService.toggleSpinner(false);

        }));
    }
  }

  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }

  cancel(event): any {
    this.dialogRef.close({ action: 'Reload' });
  }

  submit(event): any {
    let listToProcess = [];
    this.serviceList.forEach(item => {
      if (item.selected && item.type == 'new') {
        if (item.numberOfBookingAllowed && item.servicePersonStartTime &&
          item.servicePersonEndTime && item.servicePersonAvgDuration) {


          const serviceItem = {
            services: item,
            branch: this.branchList.find(x => x.branchId = this.selectedBranch),
            servicePersonLevelBooking: item.servicePersonLevelBooking,
            servicePersonDisplayName: '',
            numberOfBookingAllowed: item.numberOfBookingAllowed,
            servicePersonStartTime: item.servicePersonStartTime,
            servicePersonEndTime: item.servicePersonEndTime,
            servicePersonAvgDuration: item.servicePersonAvgDuration,
            servicePrice: item.servicePrice,
            servicePerson: item.servicePerson,
            offers: item.offers,
            allowRepeatedBooking: item.allowRepeatedBooking
          };
          if (this.row && this.row.data) {
            // serviceItem['servicePerson'] = item.servicePerson;
            serviceItem['serviceMappingId'] = item.serviceMappingId;
          }
          listToProcess.push(serviceItem);
        } else {
          listToProcess = [];
          if (item.numberOfBookingAllowed == null || item.numberOfBookingAllowed === undefined) {
            this.alertService.open(ResponseStatusModel.ERROR, `${item.serviceName} service, booking allowed is required`);
          } else if (item.servicePersonStartTime == null || item.servicePersonStartTime === undefined) {
            this.alertService.open(ResponseStatusModel.ERROR, `${item.serviceName} service, booking start time is required`);
          } else if (item.servicePersonEndTime == null || item.servicePersonEndTime === undefined) {
            this.alertService.open(ResponseStatusModel.ERROR, `${item.serviceName} service, booking end time is required`);
          } else if (item.servicePersonAvgDuration == null || item.servicePersonAvgDuration === undefined) {
            this.alertService.open(ResponseStatusModel.ERROR, `${item.serviceName} service, avg. duration is required`);
          }
          // else if (item.servicePrice == null || item.servicePrice === undefined) {
          //   this.alertService.open(ResponseStatusModel.ERROR, `${item.serviceName} service, Price is required`);
          // }
          return false;
        }
      }
    });
    const action = this.row.data ? 'Edit' : 'New';
    if (listToProcess.length > 0) {
      const param = {
        listToProcess
      };
      this.headerService.toggleSpinner(true);
      this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_ADD_SERVICE_MAPPING', param).subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action: 'Reload' });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.mapping.name} ${this.row.data ? 'edited' : 'created'} successfully`);
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

  editMapping(data) {
    if (data) {
      const actionDialogRef = this.dialog.open(IndividualEditComponent, {
        disableClose: true,
        width: '500px',
        maxHeight: '90vh',
        data: { data }
      });
      actionDialogRef.afterClosed().subscribe(result => {
        if (result.rowValue && result.rowValue.serviceMappingId && this.serviceList.length > 0) {
          const index = this.serviceList.findIndex(x => x.serviceMappingId === result.rowValue.serviceMappingId);
          if (index > -1) {
            debugger;
            this.serviceList[index].numberOfBookingAllowed = result.rowValue.numberOfBookingAllowed;
            this.serviceList[index].servicePersonAvgDuration = result.rowValue.servicePersonAvgDuration;
            this.serviceList[index].servicePersonEndTime = result.rowValue.servicePersonEndTime;
            this.serviceList[index].servicePersonLevelBooking = result.rowValue.servicePersonLevelBooking == 'true' ? true : false;
            this.serviceList[index].servicePersonStartTime = result.rowValue.servicePersonStartTime;
            this.serviceList[index].servicePrice = result.rowValue.servicePrice;
            this.serviceList[index].allowRepeatedBooking = result.rowValue.allowRepeatedBooking;
          }
        }
      });
    }
  }

  removeMapping(data) {
    if (data) {
      const actionDialogRef = this.dialog.open(MappingDeleteComponent, {
        disableClose: true,
        width: '500px',
        maxHeight: '90vh',
        data: { data }
      });
      actionDialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result && result.serviceMappingId) {
            const index = this.serviceList.findIndex(x => x.serviceMappingId === result.serviceMappingId);
            if (index > -1) {
              this.serviceList[index].servicePersonLevelBooking = false;
              this.serviceList[index].selected = false;
              this.serviceList[index].numberOfBookingAllowed = null;
              this.serviceList[index].servicePersonAvgDuration = null;
              this.serviceList[index].servicePersonEndTime = null;
              this.serviceList[index].servicePersonStartTime = null;
              this.serviceList[index].servicePrice = null;
              this.serviceList[index].type = 'new';
              this.serviceList[index].serviceMappingId = null;
             
            }
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
