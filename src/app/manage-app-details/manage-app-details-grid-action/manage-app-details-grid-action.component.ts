import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-manage-app-details-grid-action',
  templateUrl: './manage-app-details-grid-action.component.html',
  styleUrls: ['./manage-app-details-grid-action.component.scss']
})
export class ManageAppDetailsGridActionComponent implements OnInit {

  form: FormGroup;
  subscriptions: Subscription[] = [];
  deviceTypeList: any;

  constructor(
    public dialogRef: MatDialogRef<ManageAppDetailsGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      latestVersion: [this.row.data ? this.row.data.latestVersion : ''],
      downloadUrl: [this.row.data ? this.row.data.downloadUrl : ''],
      description: [this.row.data ? this.row.data.description : ''],
      appStatus: [this.row.data ? this.row.data.appStatus : false],
      downtimeStartsAt: [this.row.data ? this.row.data.downtimeStarts ? moment(this.row.data.downtimeStarts,'DD-MM-YYYY hh:mm') : null : null],
      downtimeEndsAt: [this.row.data ? this.row.data.downtimeEnds ? moment(this.row.data.downtimeEnds, 'DD-MM-YYYY hh:mm') : null : null],
      downtimeMessage: [this.row.data ? this.row.data.downtimeMessage : ''],
      upgradeMessage: [this.row.data ? this.row.data.upgradeMessage : ''],
      upgradeMessageArb: [this.row.data ? this.row.data.upgradeMessageArb : ''],
      downtimeMessageArb: [this.row.data ? this.row.data.downtimeMessageArb : ''],
      deviceType: this.formBuilder.group({
        deviceTypeId: [this.row.data ? this.row.data.deviceType ?
          this.row.data.deviceType.deviceTypeId : '' : '', [Validators.required]]
      }),
    });

    // Get all Categories
    this.headerService.toggleSpinner(true);
    this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_DEVICE_TYPE', null).subscribe((response) => {
      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.deviceTypeList = response.result.data;
          }
        }
      }
    },
      (error: any) => {
        this.headerService.toggleSpinner(false);

      }));
  }
  get eform(): any { return this.form.controls; }
  onSubmit(): any {

    const action = this.row.data ? 'Edit' : 'New';
    if (this.form.invalid) {
      return false;
    }

    // if(this.form.value.downtimeStartsAt){
    //   this.form.value.downtimeStartsAt=(moment(this.form.value.downtimeStartsAt).format('DD-MM-YYYY hh:mm'))
    // }
    
    // if(this.form.value.downtimeEndsAt){
    //   this.form.value.downtimeEndsAt=(moment(this.form.value.downtimeEndsAt).format('DD-MM-YYYY hh:mm'))
    // }


    this.manageGridService.addORupdateRowData(ModuleKeyModel.appManagement.key, this.row.data ? false : true, this.form.value)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.appManagement.name} ${this.row.data ? 'edited' : 'created'} successfully`);
            }
          }
        }
      },
        (error: any) => {
          console.log(error);
        });
  }

  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }


}




