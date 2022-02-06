import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingStatusTextModel } from 'src/app/core/model/common-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-appoinment-addons',
  templateUrl: './appoinment-addons.component.html',
  styleUrls: ['./appoinment-addons.component.scss']
})
export class AppoinmentAddonsComponent implements OnInit {

  form: FormGroup;
  listToProcess = [];
  adonsServices = [];
  servicePersons = [];

  constructor(
    public dialogRef: MatDialogRef<AppoinmentAddonsComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public adminBaseService: AdminBaseService,
    public alertService: AlertService
  ) { }

  ngOnInit(): any {
    if (this.row.data) {
      if (this.row.data.bookingStatus == BookingStatusTextModel.BKG_CMPLT) {
        this.alertService.open(ResponseStatusModel.SUCCESS, 'Booking already Completed.');
        return false;
      }
    }

    if (this.row.serviceList) {
      this.adonsServices = this.row.serviceList;
    }

    if (this.row.addonsServiceList) {
      this.row.addonsServiceList.forEach(element => {

        if (element.serviceMappingBean.services) {
          element.serviceName = element.serviceMappingBean.services.serviceName;
        }
      });
      this.listToProcess = this.row.addonsServiceList.map(x => Object.assign({}, x));
    }

    if (this.row.data) {

      this.form = this.formBuilder.group({
        bookings: this.formBuilder.group({
          bookingId: [this.row.data.bookingId, [Validators.required]]
        }),
        serviceMappingBean: this.formBuilder.group({
          serviceMappingId: [null, [Validators.required]]
        }),
        servicePersonId: [null],
        // branchServicePerson: this.formBuilder.group({
        //   servicePersonId: [null]
        // }),
        offerId: [null],
        addonComments: [null, [Validators.maxLength(1000)]]
      });
    } else {
      this.dialogRef.close();
    }
  }
  get eform(): any { return this.form.controls; }

  onSubmit(): any {

    if (this.form.invalid) {
      return false;
    }
   
    let value = this.form.value;
    const findService = this.adonsServices.find(x => x.serviceMappingId == this.form.get('serviceMappingBean.serviceMappingId').value);
    if (findService) {
      value.serviceName = findService.services.serviceName;
    }
    this.listToProcess.push(value);
    this.alertService.open(ResponseStatusModel.SUCCESS, 'Successfully Added.');
    this.form.reset();
    this.form.get('bookings.bookingId').setValue(this.row.data.bookingId);
  }

  onSubmitAndClose(): any {

    // this.listToProcess.map(function (item) {
    //   if (item.serviceName) {
    //     delete item.serviceName;
    //   }
    //   return item;
    // });
    this.adminBaseService.requestSubmit('ADM_ADD_BOOKING_ADDONS', { listToProcess: this.listToProcess }).subscribe((response) => {

      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.dialogRef.close({ addOns: this.listToProcess });
            this.alertService.open(ResponseStatusModel.SUCCESS, 'Addons successfully Added to Booking.');
          }
        }
      }
    },
      (error: any) => {
      });

  }
  serviceSelectionChange(service) {

    if (service) {
      const findService = this.adonsServices.find(x => x.serviceMappingId == service);
      if (findService) {
        this.servicePersons = findService.servicePerson;
        if (findService.offers) {
          this.form.get('offerId').setValue(findService.offers.offerId);
        } else {
          this.form.get('offerId').setValue(null);
        }
      }
    }
  }

  removeAddOns(index) {
    if (this.listToProcess.length) {
      this.listToProcess.splice(index, 1);
    }
  }
}
