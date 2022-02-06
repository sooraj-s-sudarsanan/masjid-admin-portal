import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { HeaderService } from 'src/app/core/services/header.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as moment from 'moment';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-notifications-grid-action',
  templateUrl: './notifications-grid-action.component.html',
  styleUrls: ['./notifications-grid-action.component.scss']
})
export class NotificationsGridActionComponent implements OnInit {

  notificationForm: FormGroup;
  notifChannelList: any[] = [];
  notifTriggerOnList: any[] = [];
  maxDate = new Date();
  notificationGroupList: any[] = [];
  public Editor = ClassicEditor;
  min = new Date();

  constructor(
    public dialogRef: MatDialogRef<NotificationsGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    public adminBaseService: AdminBaseService,
    public headerService: HeaderService
  ) { }

  ngOnInit() {

    this.notificationForm = this.formBuilder.group({
      notifId: [this.row.data ? this.row.data.notifId : ''],
      notifName: [this.row.data ? this.row.data.notifName : '', [Validators.required, Validators.maxLength(50)]],
      // notifOn: [this.row.data ? this.row.data.notifOn : '', [Validators.required]],
      notifChannel: [this.row.data ? this.row.data.notifChannel : '', [Validators.required]],
      notifTemplateEnglish: [this.row.data ? this.row.data.notifTemplateEnglish : '', [Validators.required]],
      notifTemplateArabic: [this.row.data ? this.row.data.notifTemplateArabic : '', [Validators.required]],
      notifSubjectEnglish: [this.row.data ? this.row.data.notifSubjectEnglish : ''],
      notifSubjectArabic: [this.row.data ? this.row.data.notifSubjectArabic : ''],
      notifTriggerOn: [this.row.data ? this.row.data.notifTriggerOn : '', [Validators.required]],
      notifTriggerValue: [this.row.data ? this.row.data.notifTriggerValue : '-1'],
      scheduleTime: [this.row.data ? this.row.data.notifScheduleTime ? moment(this.row.data.scheduleTime, 'l LT') : null : null],
      sendNow: [this.row.data ? this.row.data.sendNow : false],
      notifGroup: this.formBuilder.group({
        groupId: [this.row.data ? this.row.data.notifGroup.groupId : null, [Validators.required]]
      })
    });

    // Get all notification details
    this.headerService.toggleSpinner(true);
    this.adminBaseService.requestSubmit('ADM_LISTNOTIFDETAILSMETADATA', null).subscribe((response) => {

      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            if (response.result.data) {
              if (response.result.data.notifTriggerOn) {
                this.notifTriggerOnList = response.result.data.notifTriggerOn;
              }
              if (response.result.data.notifChannel) {
                this.notifChannelList = response.result.data.notifChannel;
              }
            }
          }
        }
      }
      this.adminBaseService.requestSubmit('ADM_LIST_NOTIFICATIONGROUP', null).subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.notificationGroupList = response.result.data;
            }
          }
        }
      });
    });

  }
  get eform() { return this.notificationForm.controls; }

  onSubmit() {
    
    const action = this.row.data ? 'Edit' : 'New';
    if (this.notificationForm.invalid) {
      return false;
    }
    const formData = this.notificationForm.value;
    
    this.manageGridService.addORupdateRowData(ModuleKeyModel.notifications.key, this.row.data ? false : true, formData)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS,
                   `${ModuleKeyModel.notifications.name} ${this.row.data ? 'edited' : 'created'} successfully`);
            }
          }
        }
      },
        (error: any) => {
          console.log(error);
        });
  }

  channelSelected(event: any) {

    if (event.value.toLowerCase() === 'email') {
      this.notificationForm.get('notifSubjectEnglish').setValidators([Validators.required, Validators.maxLength(1000)]);
      this.notificationForm.get('notifSubjectArabic').setValidators([Validators.required, Validators.maxLength(1000)]);
    } else {
      this.notificationForm.get('notifSubjectEnglish').clearValidators();
      this.notificationForm.get('notifSubjectEnglish').updateValueAndValidity();
      this.notificationForm.get('notifSubjectArabic').clearValidators();
      this.notificationForm.get('notifSubjectArabic').updateValueAndValidity();
    }
  }

  clearDateTime(){
       this.notificationForm.get('scheduleTime').setValue(null);
  }

  dateTimeChange(event: any) {

    this.notificationForm.get('sendNow').clearValidators();
    this.notificationForm.get('sendNow').updateValueAndValidity();
    this.notificationForm.get('sendNow').setValue(false);

    this.notificationForm.get('scheduleTime').setValidators([Validators.required]);
  }

  sendNowChange(isChecked: boolean) {

    this.notificationForm.get('scheduleTime').clearValidators();
    this.notificationForm.get('scheduleTime').updateValueAndValidity();
    this.notificationForm.get('scheduleTime').setValue(null);
    this.notificationForm.get('scheduleTime').setValidators([Validators.required]);
  }
  get moduleKeyModel() {
    return ModuleKeyModel;
  }

}
