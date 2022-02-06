import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import * as moment from 'moment';
import { WorkingDaysModel } from 'src/app/core/model/working-days-model';

@Component({
  selector: 'app-employee-grid-action',
  templateUrl: './employee-grid-action.component.html',
  styleUrls: ['./employee-grid-action.component.scss']
})
export class EmployeeGridActionComponent implements OnInit {

  wStartDay = null;
  wEndDay = null;
  allDataSelected = false;
  public isLoaded$ = new BehaviorSubject<boolean>(false);
  subscriptions: Subscription[] = [];
  userInfo: any;
  form: FormGroup;
  merchantList: any;
  branchList: any[];
  tabIndex = 0;
  holidayArray = [];
  @ViewChild('dp3') picker;
  minDate = new Date();
  workingTimes = [];
  workingDays = WorkingDaysModel.days;

  constructor(
    public dialogRef: MatDialogRef<EmployeeGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService,
    public alertService: AlertService,
    public authService: AuthenticationService,
    public initializeService: InitializeService,
    public dropDownService: DropDownService
  ) { }

  ngOnInit(): void {
// console.log(this.row.data.serviceAtCustomerLocation)
    this.form = this.formBuilder.group({
      servicePersonName: [this.row.data ? this.row.data.servicePersonName : '', [Validators.required, Validators.maxLength(200)]],
      servicePersonNameAR: [this.row.data ? this.row.data.servicePersonNameAR : '', [ Validators.maxLength(200)]],
      servicePersonDesc: [this.row.data ? this.row.data.servicePersonDesc : '', [Validators.maxLength(1000)]],
      // servicePersonStartTime: [this.row.data ? this.row.data.servicePersonStartTime : '', [Validators.required, Validators.maxLength(10)]],
      // servicePersonEndTime: [this.row.data ? this.row.data.servicePersonEndTime : '', [Validators.required, Validators.maxLength(10)]],
      // servicePersonAvgDuration: [this.row.data ? this.row.data.servicePersonAvgDuration : '', [Validators.required]],
      servicePersonId: [this.row.data ? this.row.data.servicePersonId : null],
      // servicePersonWorkingDay: [this.row.data ? this.row.data.servicePersonWorkingDay : null, [Validators.required]],
      merchantId: [this.row.data ? this.row.data.merchantId : '', [Validators.required]],
      branchId: [this.row.data ? this.row.data.branchId : '', [Validators.required]],
      servicePersonBookingAllowed: [this.row.data ? this.row.data.servicePersonBookingAllowed == 'true' ? true : false : false],
      email: [this.row.data ? this.row.data.email : null, [Validators.required, Validators.email, Validators.maxLength(50)]],
      mobileNo: [this.row.data ? this.row.data.mobileNo : null, [Validators.required, Validators.maxLength(15), Validators.pattern('^[0-9]+$')]],
      servicePersonHolidays: [''],
      servicePersonWorkingTime: [''],
      serviceAtCustomerLocation: [this.row.data ? this.row.data.serviceAtCustomerLocation == "true" ? true : false : false],
      numberOfBookingAllowed:[this.row.data ? this.row.data.numberOfBookingAllowed : null],
    });

    this.headerService.toggleSpinner(true);
    this.subscriptions.push(this.dropDownService.getMerchant('ADM_LIST_MERCHANTS').subscribe((response) => {
      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.merchantList = response.result.data;
            if (this.row.data) {
              this.merchantSelectionChange(this.row.data.merchantId);
            }
          }
        }
      }
    }));

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
    if (this.row.data && this.row.data.servicePersonHolidays) {
      this.holidayArray = this.row.data.servicePersonHolidays.split(',');
    }
    // Load BreakTiime
    this.workingDays.forEach(item => {
      this.workingTimes.push({
        available: false,
        day: item,
        start: null,
        end: null,
        breakstart: null,
        breakend: null
      });
    });
    if (this.row.data && this.row.data.servicePersonWorkingTime) {
      const parsedData = JSON.parse(this.row.data.servicePersonWorkingTime);
      if (parsedData.length > 0) {
        parsedData.forEach(element => {
          if (element.day) {
            let index = this.workingDays.findIndex(x => x.value == element.day.value);
            if (index > -1) {
              if(element.start && element.end){
                this.workingTimes[index].available = true;
                this.workingTimes[index].start = element.start;
                this.workingTimes[index].end = element.end
                this.workingTimes[index].breakstart = element.breakstart;
                this.workingTimes[index].breakend = element.breakend
              }

            }
          }
        });
      }
    }
  }

  get eform(): any { return this.form.controls; }


  onSubmit(event: any): any {

    const action = this.row.data ? 'Edit' : 'New';
    if (this.form.invalid) {
      this.alertService.open
        (ResponseStatusModel.ERROR, `Please check mandatory fields or invalid values`);
      return false;
    }
    if (this.holidayArray) {
      this.form.get('servicePersonHolidays').setValue(this.holidayArray.map(s => s).join(','));
    }
    if (this.workingTimes) {
      const workHours = [];
      let isValid = true;
      this.workingTimes.forEach(item => {
        if (item.available) {
          if (item.start && item.end) {
            if (item.breakstart && !item.breakend) {
              isValid = false;
              this.alertService.open(ResponseStatusModel.ERROR, `${item.day.display} break end time is required`);
              return isValid;
            } else if (!item.breakstart && item.breakend) {
              isValid = false;
              this.alertService.open(ResponseStatusModel.ERROR, `${item.day.display} break start time is required`);
              return isValid;
            } else {
              workHours.push(item);
            }
          } else {
            isValid = false;
            this.alertService.open(ResponseStatusModel.ERROR, `${item.day.display} work start time and end time is required`);
            return isValid;
          }
        }
      });
      if (!isValid) {
        this.tabIndex = 1;
        return false;
      } else {
        this.form.get('servicePersonWorkingTime').setValue(JSON.stringify(workHours));
      }
    }    
    this.headerService.toggleSpinner(true);
    let formData = this.form.value;
    formData.servicePersonDisplayName = formData.servicePersonName;
    this.subscriptions.push(this.manageGridService.addORupdateRowData(ModuleKeyModel.employee.key, this.row.data ? false : true, formData)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.employee.name} ${this.row.data ? 'edited' : 'created'} successfully`);
            }
          }
        }
        this.headerService.toggleSpinner(false);
      },
        (error: any) => {
          this.headerService.toggleSpinner(false);
        }));
  }

  merchantSelectionChange(merchantId): any {
    this.branchList = [];
    if (merchantId) {
      const param = {
        filter: `merchantBean.merchantId==${merchantId}`,
      };
      this.headerService.toggleSpinner(true);
      this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_MERCHANT_BRANCHES', param).subscribe((response) => {
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


  holidaySelected(item) {
    this.holidayArray.push((moment(item)).format('DD-MM-YYYY'));
    setTimeout(() => {
      this.clearBranchHolidays();
      this.picker.close();
    }, 100);
  }

  clearHoliday(index) {
    if (index > -1) {
      this.holidayArray.splice(index, 1);
    }
  }

  clearBranchHolidays() {
    this.form.get('servicePersonHolidays').setValue(null);
  }

  copyToAll(item, type) {

    if (item) {
      if ((item.start && item.end) || (item.breakstart && item.breakend)) {     
        this.workingTimes.forEach((element, i) => {
          if (i > this.workingTimes.indexOf(item)) {
            if (type == 'wt' && element.available) {
              element.start = item.start;
              element.end = item.end
            } else if (type == 'bt' && element.available) {
              element.breakstart = item.breakstart;
              element.breakend = item.breakend
            }
          }
        });

      }
    }
  }

  onSelectWorkingDay(event, i) {
    if (event && i > -1) {
      if (event.checked) {
        this.workingTimes[i].available = true;
      } else {
        this.workingTimes[i].available = false;
        this.workingTimes[i].start = null;
        this.workingTimes[i].end = null;
        this.workingTimes[i].breakstart = null;
        this.workingTimes[i].breakend = null;
      }
    }
  }
  clear(item, type) {
    if (type == 'wt') {
      item.start = null;
      item.end = null
    } else if (type == 'bt') {
      item.breakstart = null;
      item.breakend = null
    }
  }

  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }  
}
