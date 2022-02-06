import { Component, Inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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

@Component({
  selector: 'app-service-person-grid-action',
  templateUrl: './service-person-grid-action.component.html',
  styleUrls: ['./service-person-grid-action.component.scss']
})
export class ServicePersonGridActionComponent implements OnInit, OnDestroy {

  merchantList = [];
  selectedMerchant: any;
  branchList = [];
  selectedBranch: any;
  serviceList = [];
  selectedService: any;
  columns = [];
  mappingList: any;
  form: FormGroup;
  mappingRow = null;
  @ViewChild('delete', { static: true }) deleteTmplt: TemplateRef<any>;
  @ViewChild('formDirective') private formDirective: NgForm;
  categoryId: any;
  selectedMerchantText = 'Choose Merchant';
  selectedBranchText = 'Choose Branch';
  selectedServiceText = 'Choose Service';
  wStartDay = null;
  wEndDay = null;
  allDataSelected = false;
  numberOfBookingAllowed = 0;
  servicePersons = [];
  servicePersonsList = [];

  public isLoaded$ = new BehaviorSubject<boolean>(false);
  subscriptions: Subscription[] = [];
  userInfo: any;
  serviceMapping: any;

  constructor(
    public dialogRef: MatDialogRef<ServicePersonGridActionComponent>,
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
        this.form = this.formBuilder.group({
          servicePersonName: ['', [Validators.required, Validators.maxLength(50)]],
          servicePersonDesc: ['', [Validators.maxLength(1000)]],
          servicePersonStartTime: ['', [Validators.required, Validators.maxLength(10)]],
          servicePersonEndTime: ['', [Validators.required, Validators.maxLength(10)]],
          servicePersonAvgDuration: ['', [Validators.required]],
          servicePersonId: [''],         
          servicePersonWorkingDay: [this.row.data ? this.row.data.servicePersonWorkingDay : null, [Validators.required]]         
        });

        this.columns = [
          { name: 'Name', prop: 'servicePersonName' },
          { name: 'Service Person Booking Allowed', prop: 'servicePersonBookingAllowed' },
          { name: 'Avg Duration', prop: 'servicePersonAvgDuration' },
          { name: 'Start Time', prop: 'servicePersonStartTime' },
          { name: 'End Time', prop: 'servicePersonEndTime' },
          { name: '', cellTemplate: this.deleteTmplt }
        ];

        if (this.row.data && this.row.data.servicePersonWorkingDay) {
          if (this.row.data.servicePersonWorkingDay.indexOf('-') !== -1) {
            const holiday = this.row.data.servicePersonWorkingDay.split('-');
            if (holiday.length === 2) {
              this.wStartDay = holiday[0];
              this.wEndDay = holiday[1];
            }
          } else {
            this.wStartDay = this.row.data.servicePersonWorkingDay;
          }

        }

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
  get eform(): any { return this.form.controls; }
  merchantSelectionChange(merchantId): any {
    this.branchList = [];
    this.serviceList = [];
    this.mappingList = [];
    this.mappingRow = [];
    this.servicePersons = [];
    this.allDataSelected = false;
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
  branchSelectionChange(branch): any {

    this.serviceList = [];
    this.mappingList = [];
    this.mappingRow = [];
    this.allDataSelected = false;
    if (branch) {
      const branchInfo = this.branchList.find(x => x.branchId == branch);
      if (branchInfo) {
        const param = {
          filter: `branch.branchId==${branchInfo.branchId}`,
        };
        setTimeout(() => {        
          this.headerService.toggleSpinner(true);
        }, 100);
        this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_SERVICE_MAPPING', param).subscribe((response) => {
          if (response) {
            if (response.result) {
              if (response.result.status === 'SUCCESS') {
                this.serviceList = response.result.data;
                if (this.row) {
                  if (this.row.data) {
                    this.serviceSelectionChange(this.row.data.serviceMappingId);
                    this.selectedService = this.row.data.serviceMappingId;
                    this.selectedServiceText = this.row.data.services.serviceName;
                    // this.categoryId = branchInfo.merchantBean.category.categoryId;
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
  }

  serviceSelectionChange(serviceId): any {
    this.mappingRow = [];
    this.mappingList = [];
    this.servicePersons = [];
    if (serviceId) {

      let param = {
        filter: `serviceMappingId==${serviceId}`,
      };
      setTimeout(() => {        
        this.headerService.toggleSpinner(true);
      }, 100);
      this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_SERVICE_MAPPING', param).subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.allDataSelected = true;
              if (response.result.data.length > 0) {
                this.serviceMapping = response.result.data[0];
                // Get all service person
                param = {
                  filter: `branchId==${this.selectedBranch}##merchantId==${this.selectedMerchant}`,
                };
                this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_SERVICEPERSON', param).subscribe((SPresponse) => {

                  if (SPresponse.result) {
                    if (SPresponse.result.status === 'SUCCESS') {
                      this.servicePersonsList = SPresponse.result.data;

                      this.servicePersonsList.map(obj => ({ ...obj, disabled: false }))
                      this.mappingList = response.result.data[0];

                      this.numberOfBookingAllowed = response.result.data[0].numberOfBookingAllowed;
                      for (let i = 0; i < this.numberOfBookingAllowed; i++) {
                        this.servicePersons.push(null);
                      }
                      if (this.numberOfBookingAllowed > 0) {
                        response.result.data[0].servicePerson.forEach((element, i) => {
                          if (typeof this.servicePersons[i] !== 'undefined') {
                            //if (this.servicePersons.indexOf(i) > -1) {
                            this.servicePersons[i] = element;
                            this.personSelectionChange(element.servicePersonId, i);
                          }

                        });
                      }
                    }
                  }
                }
                ));



                // this.mappingRow = response.result.data[0].servicePerson;
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

  submitClick(event: any): any {

    if (this.servicePersons && this.serviceMapping) {

      if (this.servicePersons.find(x => x == null)) {
        this.alertService.open(ResponseStatusModel.ERROR, 'Please select all service persons')
        return false;
      } else {
        this.serviceMapping.servicePerson = this.servicePersons;
      }

      this.headerService.toggleSpinner(true);
      this.subscriptions.push(this.manageGridService.addORupdateRowData(ModuleKeyModel.servicePerson.key, false, this.serviceMapping)
        .subscribe((response) => {

          if (response) {
            if (response.result) {
              if (response.result.status === 'SUCCESS') {
                this.alertService.open
                  (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.servicePerson.name} updated successfully`);
                this.dialogRef.close({ action: 'Reload' });
              }
            }
          }
          this.headerService.toggleSpinner(false);
        },
          (error: any) => {
            this.headerService.toggleSpinner(false);
          }));
    }
  }

  onSubmit(event: any): any {
    if (this.form.invalid) {
      return false;
    }
    if (this.form.value.servicePersonId) {
      const find = this.mappingList.servicePerson.find(x => x.servicePersonId == this.form.value.servicePersonId);
      if (find) {
        find.servicePersonName = this.form.value.servicePersonName;
        find.servicePersonDesc = this.form.value.servicePersonDesc;
        find.servicePersonStartTime = this.form.value.servicePersonStartTime;
        find.servicePersonEndTime = this.form.value.servicePersonEndTime;
        find.servicePersonAvgDuration = this.form.value.servicePersonAvgDuration;
      }
    } else {
      delete this.form.value.servicePersonId;
      this.mappingList.servicePerson.push(this.form.value);
    }
    this.headerService.toggleSpinner(true);
    this.subscriptions.push(this.manageGridService.addORupdateRowData(ModuleKeyModel.servicePerson.key, false, this.mappingList)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.formDirective.resetForm();
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.servicePerson.name} updated successfully`);
              if (response.result.data) {
                this.mappingRow = [...response.result.data.servicePerson];
                this.mappingList = response.result.data;
              }
            }
          }
        }
        this.headerService.toggleSpinner(false);
      },
        (error: any) => {
          this.headerService.toggleSpinner(false);
        }));
  }

  removePerson(data, index): any {
    if (data && index && this.mappingList) {
      this.mappingList.servicePerson.splice(index, 1);
      this.headerService.toggleSpinner(true);
      this.subscriptions.push(this.manageGridService.addORupdateRowData(ModuleKeyModel.servicePerson.key, false, this.mappingList)
        .subscribe((response) => {

          if (response) {
            if (response.result) {
              if (response.result.status === 'SUCCESS') {
                this.alertService.open
                  (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.servicePerson.name} deleted successfully`);
                if (response.result.data) {
                  this.mappingRow = [...response.result.data.servicePerson];
                }
              }
            }
          }
          this.headerService.toggleSpinner(false);
        },
          (error: any) => {
            this.headerService.toggleSpinner(false);
          }));
    }
  }
  editPerson(data, index): any {
    if (data && index) {
      this.form.get('servicePersonName').setValue(data.servicePersonName);
      this.form.get('servicePersonDesc').setValue(data.servicePersonDesc);
      this.form.get('servicePersonStartTime').setValue(data.servicePersonStartTime);
      this.form.get('servicePersonEndTime').setValue(data.servicePersonEndTime);
      this.form.get('servicePersonAvgDuration').setValue(data.servicePersonAvgDuration);
      this.form.get('servicePersonId').setValue(data.servicePersonId);
    }
  }

  cancelClick(event): any {
    this.dialogRef.close({ action: 'Reload' });
  }

  onSelectedWDay(event, sec: number): any {
    if (sec === 1) {
      this.wStartDay = event;
    } else if (sec === 2) {
      this.wEndDay = event;
    }
    if (this.wStartDay && this.wEndDay) {
      this.form.get('servicePersonWorkingDay').setValue(this.wStartDay + '-' + this.wEndDay);
    } else if (this.wStartDay) {
      this.form.get('servicePersonWorkingDay').setValue(this.wStartDay);
    }
  }

  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }

  personSelectionChange(value, i) {
   
    if (value && i > -1) {
      let prevSPId = null;
      if (this.servicePersons[i] != null) {
        prevSPId = this.servicePersons[i].servicePersonId;
      }
      this.servicePersons[i] = this.servicePersonsList.find(x => x.servicePersonId == value);
     
      const index = this.servicePersonsList.findIndex(x => x.servicePersonId == value);

      if (index > -1) {
        // this.servicePersonsList.map(function(x) { 
        //   x.disabled = false; 
        //   return x
        // });
        // this.servicePersonsList.map(obj => ({ ...obj, disabled: false }))
        if (prevSPId) {
          const existIndex = this.servicePersonsList.findIndex(x => x.servicePersonId == prevSPId);
          if (existIndex > -1) {
            this.servicePersonsList[existIndex].disabled = false;
          }
        }
        this.servicePersonsList[index].disabled = true;
      } else {
        this.servicePersonsList[index].disabled = false;
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
