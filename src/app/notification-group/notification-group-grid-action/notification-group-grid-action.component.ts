import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/core/services/alert.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notification-group-grid-action',
  templateUrl: './notification-group-grid-action.component.html',
  styleUrls: ['./notification-group-grid-action.component.scss']
})
export class NotificationGroupGridActionComponent implements OnInit {

  cacheForm: FormGroup;
  notifType: any;
  category: any;
  platform: any;
  notifyBy: any;
  userRoles: any;
  iconList: any[] = [];
  selectedPlatforms: string[] = [];
  selectedUserRoles: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<NotificationGroupGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public alertService: AlertService,
    public manageGridService: ManageGridService,
    public adminBaseService: AdminBaseService,
    public headerService: HeaderService  
  ) { }

  ngOnInit() {
    
    this.cacheForm = this.formBuilder.group({
      groupId: [this.row.data ? this.row.data.groupId : ''],
      groupType: [this.row.data ? this.row.data.groupType : null, [Validators.required,Validators.maxLength(250)]],
      groupName: [this.row.data ? this.row.data.groupName : null, [Validators.required, Validators.maxLength(500)]],
      groupNameArb: [this.row.data ? this.row.data.groupNameArb : null, [Validators.required, Validators.maxLength(500)]],
      platform: [], 
      category: [this.row.data ? this.row.data.category : null, [Validators.required]],    
      // sentNotification: [this.row.data ? this.row.data.sentNotification=="true" : false],     
      notifyBy: [this.row.data ? this.row.data.notifyBy : null, [Validators.required]]
    });
    if (this.row.data && this.row.data.platform) {
      this.selectedPlatforms = this.row.data.platform.split(',');
    }   
    this.headerService.toggleSpinner(true);
    this.adminBaseService.requestSubmit('ADM_LISTNOTIFGROUPMETADATA', null).subscribe((response) => {
      this.headerService.toggleSpinner(false);
      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.notifType = response.result.data.notifType;
            this.category = response.result.data.category;
            this.platform = response.result.data.platform;
            this.notifyBy = response.result.data.notifyBy;            
          }
        }
      }
    });

  } 

  patchValues(value) {
    return this.formBuilder.group({
      roleId: [value]
    });
  }

  get eform() { return this.cacheForm.controls; }

  onSubmit() {

    const action = this.row.data ? 'Edit' : 'New';
    if (this.cacheForm.invalid) {
      return false;
    }
    let formValue = this.cacheForm.getRawValue();  

    if (this.selectedPlatforms.length > 0) {
      formValue.platform = this.selectedPlatforms.join(',');
    } else {
      this.alertService.open(ResponseStatusModel.ERROR, 'Please choose platform');
      return false;
    }
    
    this.manageGridService.addORupdateRowData(ModuleKeyModel.notificationGroup.key, this.row.data ? false : true, formValue)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
              (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.notificationGroup.name} ${this.row.data ? 'edited' : 'created'} successfully`);
            }
          }
        }

      },
        (error: any) => {
          console.log(error);
        });

  }

  searchIcon(term: string, item: any) {
    term = term.toLowerCase();
    return item.fileIconCss.toLowerCase().indexOf(term) > -1 ||
      item.fileName.toLowerCase().indexOf(term) > -1;
  }

  onSelectedUserRole(value: any) {

    const clone = JSON.parse(JSON.stringify(value));
    this.selectedUserRoles = clone.map(x => x);

  }
  onSelectedPlatform(value: any) {

    this.selectedPlatforms = value.map(x => x);
  }
  get moduleKeyModel() {
    return ModuleKeyModel;
  }

}
