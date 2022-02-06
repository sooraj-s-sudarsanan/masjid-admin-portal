import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';
import * as moment from 'moment';
import { BookingStatusCodeModel, SlotStatusModel } from 'src/app/core/model/SlotStatus-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { BookingService } from 'src/app/core/services/booking.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { InitializeService } from 'src/app/core/services/initialize.service';
import { DropDownService } from 'src/app/core/services/drop-down.service';
import { OnDestroy } from '@angular/core';
import { WorkingDaysModel } from 'src/app/core/model/working-days-model';
import { AppoinmentAddonsComponent } from '../appoinment-addons/appoinment-addons.component';
import { BookingStatusTextModel } from 'src/app/core/model/common-model';
@Component({
  selector: 'app-appoinment-grid-action',
  templateUrl: './appoinment-grid-action.component.html',
  styleUrls: ['./appoinment-grid-action.component.scss']
})
export class AppoinmentGridActionComponent implements OnInit, OnDestroy {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  confirmFormGroup: FormGroup;

  merchantList = [];
  selectedMerchant: any;
  branchList = [];
  selectedBranch: any;
  serviceList = [];
  selectedService: any;
  bookingStatusBean = [];
  step = 0;
  slotList = [];
  operationHours: string;
  totalDay = 7;
  viewAllSlot = false;
  serviceTime = 30;
  selectedSlot: any;
  servicePersonLevelBooking = false;
  servicePersonList = [];
  subscriptions: Subscription[] = [];
  branchInfo: any;
  selectedServicePerson: any;
  selectedServicePersonId: any;

  public isLoaded$ = new BehaviorSubject<boolean>(false);
  userInfo: any;
  addonsServiceList = [];
  page = 1;
  slotBookingPer = 0;
  amountSplitUps = {
    serviceAmount: 0,
    discount: 0,
    total: 0,
    savedAmount: 0
  }
  alertOnSlots: { title: string; type: string; slot: any };
  actionDialogRef: MatDialogRef<unknown, any>;
  @ViewChild('bookingAlert', { static: true }) bookingAlertTemplate: TemplateRef<any>;
  actionDialogBookAlert: MatDialogRef<any, any>;

  repeatBookMinDate = new Date();
  repeatBuffer = new Date(new Date().setMonth(new Date().getMonth() + 1));
  repeatBookMaxDate = this.repeatBuffer;
  repeatBooking = false;
  repeatBookingDate = null;
  repeatBookingDateAlert = null;
  @ViewChild('bookingConfirm', { static: true }) bookingConfirmTemplate: TemplateRef<any>;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AppoinmentGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService,
    public datepipe: DatePipe,
    public alertService: AlertService,
    public bookingService: BookingService,
    public authenticationService: AuthenticationService,
    public initializeService: InitializeService,
    public dropDownService: DropDownService,
    private dialogRefAll: MatDialog
  ) { }
  get cnfrmform(): any { return this.confirmFormGroup.controls; }
  ngOnInit(): any {


    if (this.row.data) {
      if (this.row.data.bookingStatus == BookingStatusTextModel.BKG_CMPLT) {
        this.alertService.open(ResponseStatusModel.ERROR, 'Booking already Completed.');
        this.dialogRef.close();
        return false;
      }
    }

    this.headerService.toggleSpinner(true);
    this.subscriptions.push(this.initializeService.initializeCompleted$.subscribe((response) => {
      if (response) {

        if (this.authenticationService.userInfo) {
          this.userInfo = this.authenticationService.userInfo;
          this.isLoaded$.next(true);
        }
      }
    }));

    this.subscriptions.push(this.isLoaded$.subscribe(loaded => {
      if (loaded) {
        this.secondFormGroup = this.formBuilder.group({
          merchantId: ['', [Validators.required]],
          branchId: ['', [Validators.required]],
          serviceId: ['', [Validators.required]],
          selectedSlot: ['', [Validators.required]],
          servicePersonId: ['']
        });

        this.confirmFormGroup = this.formBuilder.group({
          guestUserMobile: [this.row.data ? this.row.data.guestUserMobile : '', [Validators.required, Validators.pattern('^(\\+\\d{1,3}[- ]?)?\\d{7,15}$')]],
          guestUserName: [this.row.data ? this.row.data.guestUserName : '', [Validators.required, Validators.maxLength(100)]]
        });


        this.headerService.toggleSpinner(true);

        if (this.row.data) {

          if (this.row.data.branchServicePerson) {
            this.selectedServicePersonId = this.row.data.branchServicePerson.servicePersonId;
          }

          // Load repeated booking         
          if (this.row.data.repeatedBooking == 'true') {
            this.repeatBooking = true;            
          }

          // Load Add Ons
          const filter = {
            "filter": `bookings.bookingId==${this.row.data.bookingId}`,
            "sortBy": "",
            "sortOrder": "ASC"
          }
          this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_BOOKING_ADDONS', filter).subscribe(addOns => {

            if (addOns.result) {
              if (addOns.result.status === ResponseStatusModel.SUCCESS) {
                this.addonsServiceList = addOns.result.data;
              }
            }
          }));
        }

        this.subscriptions.push(this.dropDownService.getMerchant('ADM_LIST_MERCHANTS', null).subscribe((response) => {
          if (response) {
            if (response.result) {
              if (response.result.status === 'SUCCESS') {

                this.merchantList = response.result.data;
                if (this.merchantList.length === 1) {
                  this.selectedMerchant = this.merchantList[0].merchantId;
                  this.merchantSelectionChange(this.selectedMerchant);
                }
                if (this.row) {
                  if (this.row.data) {
                    this.merchantSelectionChange(this.row.data.serviceMappingBean.branch.merchantBean.merchantId);
                    this.selectedMerchant = this.row.data.serviceMappingBean.branch.merchantBean.merchantId;

                    // Bind SP dropdown value
                    this.selectedServicePerson = this.row.data.branchServicePerson ? this.row.data.branchServicePerson : null;
                    this.secondFormGroup.get('servicePersonId').setValue(this.row.data.branchServicePerson ? this.row.data.branchServicePerson.servicePersonId : null)
                  }
                }
              }
            }
            this.bookingService.readStausMaster();
            this.subscriptions.push(this.bookingService.statusMaster$.subscribe((response) => {
              if (response) {
                this.bookingStatusBean = response;
                this.headerService.toggleSpinner(false);
              }
            }));
          }
        },
          (error: any) => {
            this.headerService.toggleSpinner(false);

          }));
      }
    }));


  }
  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }

  merchantSelectionChange(merchantId): any {

    this.branchList = [];
    this.serviceList = [];

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
              if (this.row) {
                if (this.row.data) {
                  this.branchSelectionChange(this.row.data.serviceMappingBean.branch.branchId);
                  this.selectedBranch = this.row.data.serviceMappingBean.branch.branchId;
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
    if (branch) {
      this.branchInfo = this.branchList.find(x => x.branchId === branch);
      if (this.branchInfo) {
        this.operationHours = this.branchInfo.branchOperationTime;
        const param = {
          filter: `branch.branchId==${this.branchInfo.branchId}`,
        };
        this.headerService.toggleSpinner(true);
        this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_SERVICE_MAPPING', param).subscribe((response) => {
          if (response) {
            if (response.result) {
              if (response.result.status === 'SUCCESS') {
                this.serviceList = response.result.data;

                if (this.row) {
                  if (this.row.data) {
                    this.serviceSelectionChange(this.row.data.serviceMappingBean, 'edit');
                    this.selectedService = this.row.data.serviceMappingBean;
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

  serviceSelectionChange(service, action = 'new'): any {

    if (service) {
      if (service) {
        this.selectedSlot = null;
        this.selectedService = service;
        this.servicePersonLevelBooking = Boolean(JSON.parse(service.servicePersonLevelBooking));
        if (service.servicePersonList) {
          this.servicePersonList = service.servicePerson;
        }
        this.serviceTime = +service.servicePersonAvgDuration;
        const createStatus = this.createSlot();
        if (createStatus === false) {
          return false;
        }
        this.slotList = this.slotList.filter(x => x.hourSlot.map(y => {
          y.numberOfBookingAllowed = service.numberOfBookingAllowed;
          y.servicePersonList = service.servicePerson;
          y.servicePersonAvail = true;
        }));



        this.manageSlot(service.serviceMappingId, action);

      } else {
        this.selectedService = null;
        this.selectedSlot = null;
      }
    }
  }

  manageSlot(serviceMappingId, action) {
    let endDate = null;
    if (this.page > 1) {
      endDate = new Date();
      endDate.setDate(endDate.getDate() + this.totalDay)
    } else {
      endDate = new Date();
    }
    const requestBody = {
      filter: `serviceMappingBean.serviceMappingId==${serviceMappingId}##bookingStatus==${BookingStatusCodeModel.BKG_CNF}##bookingDate::${this.datepipe.transform(new Date(), 'dd-MM-yyyy')},${this.datepipe.transform((endDate.setDate(endDate.getDate() + 1)), 'dd-MM-yyyy')},${this.datepipe.transform((endDate.setDate(endDate.getDate() + 1)), 'dd-MM-yyyy')}`,
      sortBy: '',
      sortOrder: 'ASC'
    };
    setTimeout(() => {
      this.headerService.toggleSpinner(true);
    }, 100);
    this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_BOOKINGS', requestBody).subscribe((response) => {
      if (response) {
        if (response.result) {
          if (response.result.status === ResponseStatusModel.SUCCESS) {
            if (response.result.data && this.slotList.length > 0) {
              response.result.data.forEach((i, index) => {
                const exist = this.slotList.filter
                  (slot => slot.hourSlot.some(item => item.date === i.bookingDate &&
                    item.time === i.bookingStartTime &&
                    item.status !== SlotStatusModel.DISABLED))
                  .map(x => x.hourSlot.find(f => f.date === i.bookingDate && f.time === i.bookingStartTime));

                if (exist.length > 0) {
                  exist[0].numberOfBookingAllowed -= 1;
                  if (exist[0].servicePersonList) {
                    const spFind = exist[0].servicePersonList.find(x => x.servicePersonId === i.branchServicePerson.servicePersonId);
                    if (spFind) {
                      const temp = [...exist[0].servicePersonList];
                      if (temp.length > 0) {
                        temp.splice(temp.indexOf(spFind), 1);
                        exist[0].servicePersonList = temp;
                      }
                    }
                  }
                  if (exist[0].numberOfBookingAllowed === 0) {
                    exist[0].status = SlotStatusModel.BOOKED;
                  }
                }
              });
              if (action === 'edit' && this.row.data) {
                const findSelected = this.slotList.filter
                  (slot => slot.hourSlot.some(item => item.date === this.row.data.bookingDate &&
                    item.time === this.row.data.bookingStartTime &&
                    item.status !== SlotStatusModel.DISABLED))
                  .map(x => x.hourSlot
                    .find(f => f.date === this.row.data.bookingDate &&
                      f.time === this.row.data.bookingStartTime));
                if (findSelected && findSelected.length > 0) {
                  findSelected[0].status = SlotStatusModel.DISABLED;
                  this.selectedSlot = findSelected[0];
                }
                // Check service person slot avail or not
                if (this.row.data.branchServicePerson) {
                  this.onSelectServicePerson(this.row.data.branchServicePerson);
                }
              }
            }
          }
        }
      }
      setTimeout(() => {
        this.headerService.toggleSpinner(false);
      }, 100);
    }, (error: any) => {
    }));
  }

  getDayOfWeek(date, holidays: any[], breakParsed: any): any {

    let status = SlotStatusModel.OPEN;

    if (date < new Date()) {
      status = SlotStatusModel.DISABLED;
    } else {

      // Holiday Check
      if (this.branchInfo.branchHolidays) {
        const currentDate = moment(new Date(date)).format('DD-MM-YYYY');
        const holidaysList = this.branchInfo.branchHolidays.split(',');
        const checkHoliday = holidaysList.find(x => x == currentDate);
        if (checkHoliday != null) {
          status = SlotStatusModel.DISABLED;
          return status;
        }
        // const holiday = moment(new Date(this.branchInfo.branchHolidays)).format('DD-MM-YYYY');
        // if (currentDate == holiday) {
        //   status = SlotStatusModel.DISABLED;
        //   return status;
        // }
      }

      // Breaktime Check
      if (breakParsed) {

        const dayOfWeek = new Date(date).getDay();
        const day = isNaN(dayOfWeek) ? null :
          WorkingDaysModel.days[dayOfWeek];
        const timeFind = breakParsed.find(x => x.day.value == day.value);
        if (timeFind) {
          if (timeFind.start && timeFind.end) {
            const brkStart = moment(`${moment(date).format('DD-MM-YYYY')} ${timeFind.start}`, 'DD-MM-YYYY hh:mm A').toDate();
            //new Date(`${moment(date).format('YYYY-MM-DD')} ${timeFind.start}`);
            const brkEnd = moment(`${moment(date).format('DD-MM-YYYY')} ${timeFind.end}`, 'DD-MM-YYYY hh:mm A').toDate()
            //new Date(`${moment(date).format('YYYY-MM-DD')} ${timeFind.end}`);          
            if (!(date >= brkStart) && !(date < brkEnd)) {
              status = SlotStatusModel.DISABLED;
              return status;
            }
          }
        }
      }

      const dayOfWeek = new Date(date).getDay();
      const day = isNaN(dayOfWeek) ? null :
        WorkingDaysModel.days[dayOfWeek];
      if (day && this.selectedService) {
        const isHoliday = holidays.find(x => x.value.toUpperCase() === day.value.toUpperCase())
        if (isHoliday) {
          status = SlotStatusModel.DISABLED;
        }
      }
    }
    return status;
  }

  createSlot(): any {

    if (this.selectedService) {

      if (isNaN(this.serviceTime)) {
        this.alertService.open(ResponseStatusModel.ERROR, 'Please check service duration.');
        this.slotList = [];
        return false;
      }

      const holiday = [];
      if (this.selectedService.branch.branchHolidays) {
        if (this.selectedService.branch.branchHolidays.indexOf('-') > -1) {
          const holidaysplt = this.selectedService.branch.branchWeeklyOff.split('-');
          holidaysplt.forEach(element => {
            let dayFind = WorkingDaysModel.days.findIndex(x => x.value === element);
            if (dayFind > -1) {
              holiday.push(WorkingDaysModel.days[dayFind])
            }
          });
        } else {
          holiday.push(WorkingDaysModel.days.find(x => x.value === this.selectedService.branch.branchWeeklyOff));
        }
      }

      // Break Time
      let breakParsed;
      if (this.branchInfo.branchbreakTime) {
        breakParsed = JSON.parse(this.selectedService.branch.branchbreakTime);
      }

      this.slotList = [];
      const ohArray = [this.selectedService.servicePersonStartTime,
      this.selectedService.servicePersonEndTime]; // this.operationHours.split('to');
      let startTime: Date;
      let endTime: Date;

      let currDate: Date;
      for (let i = 1; i <= this.totalDay; i++) {
        if (i === 1) {
          currDate = new Date();
        } else {
          currDate.setDate(currDate.getDate() + 1);
        }
        const daySlot = {
          displayDay: `${moment(currDate).format('ddd')}`,
          displayMonth: `${moment(currDate).format('DD')} ${moment(currDate).format('MMM')}`,
          value: moment(currDate).format('DD-MM-YYYY'),
          hourSlot: []
        };

        let isValidServiceTime = true;
        ohArray.forEach((date, index) => {
          const hhmmArray = date.split(' ');
          if (index === 0) {
            startTime = new Date(`${moment(currDate).format('YYYY-MM-DD')} ${hhmmArray[0]}:00 ${hhmmArray[1]}`);
            if (isNaN(startTime.getTime())) {  // d.valueOf() could also work
              this.alertService.open(ResponseStatusModel.ERROR, 'Please check your service start time.');
              isValidServiceTime = false;
              return false;
            }
          } else if (index === 1) {
            endTime = new Date(`${moment(currDate).format('YYYY-MM-DD')} ${hhmmArray[0]}:00 ${hhmmArray[1]}`);
            if (isNaN(endTime.getTime())) {  // d.valueOf() could also work
              this.alertService.open(ResponseStatusModel.ERROR, 'Please check your service end time.');
              isValidServiceTime = false;
              return false;
            }
          }
        });

        if (isValidServiceTime) {

          do {
            const getStatus = this.getDayOfWeek(startTime, holiday, breakParsed);
            daySlot.hourSlot.push({
              display: getStatus === SlotStatusModel.OPEN ? moment(startTime).format('hh:mm a') : ' - ',
              time: moment(startTime).format('hh:mm a'),
              date: moment(currDate).format('DD-MM-YYYY'),
              value: moment(startTime).format('YYYY-MM-DD hh:mm ss a'),
              status: getStatus// startTime > new Date() ? SlotStatusModel.OPEN : SlotStatusModel.DISABLED
            });
            startTime.setMinutes(startTime.getMinutes() + this.serviceTime);
          }
          while (startTime < endTime);
        } else {
          this.slotList = [];
          return false;
        }
        this.slotList.push(daySlot);
      }
    }

  }

  onSelectTimeSlot(slot): any {

    if (slot && (slot.status === SlotStatusModel.OPEN.toString() || slot.status === SlotStatusModel.SELECTED)) {
      // this.slotBookingPer = 0;
      // try {
      //   if (this.selectedService) {
      //     if (this.selectedService.numberOfBookingAllowed && slot.numberOfBookingAllowed) {
      //       this.slotBookingPer = (slot.numberOfBookingAllowed / +this.selectedService.numberOfBookingAllowed) * 100;
      //     }
      //   }
      // } catch (error) {
      //   this.slotBookingPer = 0;
      // } 

      if (this.authenticationService.isLoggedIn()) {
        if (slot.servicePersonAvail) {
          // Check service person availble or not
          if (slot.servicePersonList.length > 0) {
            let firstAvailEmp = null;
            //Checkpersonal level cheking
            // if (this.servicePersonLevelBooking) {
            // Already selected service person

            if (this.selectedServicePersonId && this.selectedServicePerson) {
              let servicePersonWorkingTime = []
              if (this.selectedServicePerson.servicePersonWorkingTime) {
                servicePersonWorkingTime = JSON.parse(this.selectedServicePerson.servicePersonWorkingTime);
                const personHolidays = this.selectedServicePerson.servicePersonHolidays ? this.selectedServicePerson.servicePersonHolidays.split(',') : [];
                if (!this.checkSlotAvailForServicePerson(slot, servicePersonWorkingTime, personHolidays)) {
                  this.alertOnSlots = {
                    title: `Service person not available!`,
                    type: 'unavailserviceperson',
                    slot
                  };

                  this.openBookingAlertModal();
                  return false;
                } else {
                  firstAvailEmp = this.selectedServicePerson;
                }
              }

            } else {
              // Not selected a service person check all available service persons
              let servicePersonAvailCount = slot.servicePersonList.length;
              this.headerService.toggleSpinner(true);
              slot.servicePersonList.forEach((emp, i) => {
                let servicePersonWorkingTime = []
                if (emp.servicePersonWorkingTime) {
                  servicePersonWorkingTime = JSON.parse(emp.servicePersonWorkingTime);
                }
                const personHolidays = emp.servicePersonHolidays ? emp.servicePersonHolidays.split(',') : [];
                if (!this.checkSlotAvailForServicePerson(slot, servicePersonWorkingTime, personHolidays)) {
                  servicePersonAvailCount -= 1;
                } else if (!firstAvailEmp) {
                  firstAvailEmp = emp;
                  return;
                }
              });
              this.headerService.toggleSpinner(false);
              if (servicePersonAvailCount == 0) {
                this.alertOnSlots = {
                  title: `Service person not available!`,
                  type: 'unavailserviceperson',
                  slot
                };
                this.openBookingAlertModal();
                return false;
              }
            }
            // } else {
            //   firstAvailEmp = slot.servicePersonList[0];
            // }


            if (firstAvailEmp) {
              const selectedDT = moment(slot.value, 'YYYY-MM-DD hh:mm ss a'); // Date.parse(slot.value);
              if (moment(selectedDT).isAfter(moment(new Date(), 'YYYY-MM-DD hh:mm ss a'))) {

                this.step = 2;
                this.secondFormGroup.get('selectedSlot').setValue(slot.value);
                this.selectedSlot = slot;
                this.slotList = this.slotList.filter(x => x.hourSlot.map(y => {
                  y.status = y.status === SlotStatusModel.SELECTED ? SlotStatusModel.OPEN : y.status;
                }));
                this.selectedSlot.status = SlotStatusModel.SELECTED;
                const startDate = moment(this.selectedSlot.value, 'YYYY-MM-DD hh:mm ss a');

                // Repeat booking Date arrange
                this.repeatBookMinDate = startDate.toDate();
                this.repeatBuffer = new Date(startDate.toDate().setMonth(startDate.toDate().getMonth() + 1));
                this.repeatBookMaxDate = this.repeatBuffer;
                this.repeatBookingDate = null;
                this.repeatBookingDateAlert = null;
                if(!this.row.data){
                  this.repeatBooking = false;
                }
              }
              this.selectedServicePerson = firstAvailEmp
              // this.bookNow();
              if (this.row.data) {
                this.alertOnSlots = {
                  title: `Do you want to change the slot?`,
                  type: 'bookingConfirm',
                  slot
                };
                this.openBookingAlertModal();
              }
            } else {
              this.alertOnSlots = {
                title: `Service person not available!`,
                type: 'unavailserviceperson',
                slot
              };
              this.openBookingAlertModal();
            }
            // this.scrollTop();


          } else {
            this.alertOnSlots = {
              title: `Service person not available!`,
              type: 'unmappedserviceperson',
              slot
            };
            this.openBookingAlertModal();
          }
        } else {
          this.alertOnSlots = {
            title: `Service person not available!`,
            type: 'unavailserviceperson',
            slot
          };
          this.openBookingAlertModal();
        }
      }
    }
  }

  openBookingAlertModal() {

    this.actionDialogBookAlert = this.dialog.open(this.bookingAlertTemplate, {
      disableClose: false
    });
  }

  closeBookingAlert(type) {
    if (type == 'ok') {
      this.selectedSlot = null;
      if (this.actionDialogBookAlert) {
        this.actionDialogBookAlert.close();
      }
    } else if (type == 'yes') {
      if (this.actionDialogBookAlert) {
        this.actionDialogBookAlert.close();
      }
      this.bookNow();
    } else if (type == 'no') {
      this.selectedSlot = null;
      if (this.actionDialogBookAlert) {
        this.actionDialogBookAlert.close();
      }
    }

  }

  bookNow(): any {

    if (!this.confirmFormGroup.valid) {
      return false;
    }
    const statusConfirmed = this.bookingStatusBean.find(x => x.statusCode === BookingStatusCodeModel.BKG_CNF);
    if (this.selectedService && this.branchInfo && this.selectedSlot && this.selectedServicePerson) {
      const startDate = moment(this.selectedSlot.value, 'YYYY-MM-DD hh:mm ss a');

      const result = 'slotBooking';
      if (this.row.data == null) {
        this.headerService.toggleSpinner(true);
        const requestBody: any = this.createBookNowRequestBody(startDate);
        if (this.repeatBooking && this.repeatBookingDate) {
          requestBody.repeatedBooking = true;
          requestBody.bookingEndDate = this.repeatBookingDate;
        } else {
          requestBody.repeatedBooking = false;
          requestBody.bookingEndDate = null;
        }

        this.subscriptions.push(this.adminBaseService
          .requestSubmit('ADM_ADD_BOOKING', requestBody)
          .subscribe((response) => {
            if (response) {
              if (response.result) {
                if (response.result.status === ResponseStatusModel.SUCCESS) {

                  this.repeatBooking = false;
                  this.repeatBookingDate = null;
                  if(response.result.data.warningMessage){
                    this.repeatBookingDateAlert = `Please Note, Slots are not available on ${response.result.data.warningMessage}`;
                    this.actionDialogBookAlert = this.dialog.open(this.bookingConfirmTemplate, {
                      disableClose: false
                    });
                  }else{
                    this.alertService.open(ResponseStatusModel.SUCCESS, 'Booked successfully.');
                    this.dialogRef.close({ action: 'Reload' });
                  }                 
                }
              }
            }
            setTimeout(() => {
              this.headerService.toggleSpinner(false);
            }, 100);
            this.headerService.toggleSpinner(false);
          }));
      } else if (this.row.data) {

        this.row.data.bookingDate = startDate.format('DD-MM-YYYY');
        this.row.data.bookingStartTime = startDate.format('hh:mm a');
        this.row.data.bookingEndTime = startDate.add(this.serviceTime, 'minutes').format('hh:mm a');
        setTimeout(() => {
          this.headerService.toggleSpinner(true);
        }, 100);
        this.subscriptions.push(this.adminBaseService
          .requestSubmit('ADM_UPDATE_BOOKING', this.row.data)
          .subscribe((response) => {
            if (response) {
              if (response.result) {
                if (response.result.status === ResponseStatusModel.SUCCESS) {
                  this.alertService.open(ResponseStatusModel.SUCCESS, 'Booking updated successfully.');
                  this.dialogRef.close({ action: 'Reload' });
                }
              }
            }
            setTimeout(() => {
              this.headerService.toggleSpinner(false);
            }, 100);
          }));
      }
    }
  }

  onSelectServicePerson(item: any) {
    const person = item.value;
    if (person) {
      this.selectedServicePersonId = person.servicePersonId;
      let servicePersonWorkingTime = []
      if (person.servicePersonWorkingTime) {
        servicePersonWorkingTime = JSON.parse(person.servicePersonWorkingTime);
      }
      const personHolidays = person.servicePersonHolidays ? person.servicePersonHolidays.split(',') : [];

      this.step = 3;
      this.selectedServicePerson = person;
      this.slotList.forEach(item => {
        item.hourSlot.forEach(slot => {
          slot.servicePersonAvail = true;
          if (slot.servicePersonList.find(x => x.servicePersonId == this.selectedServicePersonId)) {
            if (servicePersonWorkingTime.length) {
              this.checkSlotAvailForServicePerson(slot, servicePersonWorkingTime, personHolidays);
            } else {
              slot.servicePersonAvail = false;
            }
          } else {
            slot.servicePersonAvail = false;
          }
        });
      });
    }
  }

  AddOneService($event): any {

    if (this.row.data) {
      const actionDialogRef = this.dialog.open(AppoinmentAddonsComponent, {
        disableClose: true,
        width: '600px',
        data: {
          data: this.row.data, serviceList: this.serviceList,
          addonsServiceList: this.addonsServiceList
        }
      });

      actionDialogRef.afterClosed().subscribe(result => {

        if (result) {
          if (result.addOns) {
            this.addonsServiceList = result.addOns;
          }
        }
      });
    }
  }

  checkSlotAvailForServicePerson(slot, servicePersonWorkingTime, personHolidays): boolean {

    if ((slot.status === SlotStatusModel.OPEN || slot.status === SlotStatusModel.SELECTED) && servicePersonWorkingTime) {

      // Date check     
      const dateCheck = personHolidays.find(x => x == slot.date);
      if (dateCheck) {
        slot.servicePersonAvail = false;
        return false;
      }

      // Day check
      const slotDate = moment(slot.value, 'YYYY-MM-DD hh:mm ss a');
      const dayOfWeek = (slotDate.toDate().getDay())
      const day = isNaN(dayOfWeek) ? null :
        WorkingDaysModel.days[dayOfWeek + 1];
      let isWorkingDay = null;
      if (day && servicePersonWorkingTime.length > 0) {
        isWorkingDay = servicePersonWorkingTime.find(x => x.available == true && x.day.value.toUpperCase() === day.value.toUpperCase());
        if (isWorkingDay) {
          slot.servicePersonAvail = true;
        } else {
          slot.servicePersonAvail = false;
          return false;
        }
      } else {
        slot.servicePersonAvail = false;
        return false;
      }
      // Working Time check
      if (slot.servicePersonAvail && isWorkingDay) {
        const employeeAvailDate = moment(slot.date + ' ' + isWorkingDay.start, 'DD-MM-YYYY hh:mm A');
        const employeeAvailTill = moment(slot.date + ' ' + isWorkingDay.end, 'DD-MM-YYYY hh:mm A');
        if (!moment(slotDate).isSameOrAfter(employeeAvailDate) || moment(slotDate).isAfter(employeeAvailTill)) {
          slot.servicePersonAvail = false;
          return false;
        } else {
          slot.servicePersonAvail = true;
        }
      }
      // Break Time check
      if (isWorkingDay && slot.servicePersonAvail) {
        if (isWorkingDay.breakstart && isWorkingDay.breakend) {
          const brkStart = moment(slot.date + ' ' + isWorkingDay.breakstart, 'DD-MM-YYYY hh:mm A');
          const brkEnd = moment(slot.date + ' ' + isWorkingDay.breakend, 'DD-MM-YYYY hh:mm A');
          if (moment(slotDate).isSameOrAfter(brkStart) && moment(brkEnd).isAfter(slotDate)) {
            slot.servicePersonAvail = false;
            return false;
          }
          // if (new Date(slot.value) >= brkStart && new Date(slot.value) < brkEnd) {
          //   slot.servicePersonAvail = false;
          //   return;
          // }
        }
      }
      return true;
    }
  }

  slotViewOption(): void {
    this.viewAllSlot = !this.viewAllSlot;
  }

  createBookNowRequestBody(startDate) {
    const requestBody: any = {
      actualPrice: `${this.selectedService.servicePrice}`,
      bookingComments: null,
      bookingDate: startDate.format('DD-MM-YYYY'),
      bookingStartTime: startDate.format('hh:mm a'),
      bookingEndTime: startDate.add(this.serviceTime, 'minutes').format('hh:mm a'),
      bookingStatus: BookingStatusCodeModel.BKG_CNF,
      branchId: this.branchInfo.branchId,
      branchName: this.branchInfo.branchName,
      branchNameAR: this.branchInfo.branchNameAR,
      categoryId: this.selectedService.services.category.categoryId,
      categoryName: this.selectedService.services.category.categoryName,
      categoryNameAR: this.selectedService.services.category.categoryNameAR,
      isLiked: false,
      liked: false,
      merchantId: this.branchInfo.merchantBean.merchantId,
      merchantName: this.branchInfo.merchantBean.merchantName,
      merchantNameAR: this.branchInfo.merchantBean.merchantNameAR,
      offerAmount: this.selectedService.offerAmount,
      offerAppliedPrice:  null,
      offerId: this.selectedService.offers?.offerId,
      offerName: this.selectedService.offers?.offerName,
      offerNameAR: this.selectedService.offers?.offerNameAR,
      offerType: this.selectedService.offers?.offerType.offerTypeName,
      offerValue: this.selectedService.offers?.offerValue,
      serviceId: this.selectedService.services.serviceId,
      serviceMappingId: this.selectedService.serviceMappingId,
      serviceName: this.selectedService.services.serviceName,
      serviceNameAR: this.selectedService.services.serviceNameAR,
      servicePersonId: this.selectedServicePerson.servicePersonId,
      servicePersonName: this.selectedServicePerson.servicePersonName,

      adminUserId: this.authenticationService.readLoggedUserId(),
      guestUserName: this.confirmFormGroup.get('guestUserName').value,
      guestUserMobile: this.confirmFormGroup.get('guestUserMobile').value
    };
    return requestBody;
  }

  repeatBookingDateChange(event) {

    if (event.value && this.selectedService && this.selectedSlot && this.selectedServicePerson) {
      this.repeatBookingDateAlert = null;
      this.repeatBookingDate = moment(event.value).format('DD-MM-YYYY')
      const startDate = moment(this.selectedSlot.value, 'YYYY-MM-DD hh:mm ss a');
      this.headerService.toggleSpinner(true);

      const requestBody: any = this.createBookNowRequestBody(startDate);
      requestBody.repeatedBooking = true;
      requestBody.bookingEndDate = this.repeatBookingDate;

      this.subscriptions.push(this.adminBaseService
        .requestSubmit('ADM_CHECK_REPEATED_AVAILAIBILITY', requestBody)
        .subscribe((response) => {
          if (response) {
            if (response.result) {
              if (response.result.status === ResponseStatusModel.SUCCESS &&
                response.result.data) {
                this.repeatBookingDateAlert = `Slots are not available on ${response.result.data}`
              } else {
                this.repeatBookingDateAlert = null;
              }
            }
          }
          this.headerService.toggleSpinner(false);
        }, err => {
          this.repeatBookingDateAlert = null;
          this.headerService.toggleSpinner(false);
        }));
    }
  }

  CloseAllModal(){
    this.dialogRefAll.closeAll();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
