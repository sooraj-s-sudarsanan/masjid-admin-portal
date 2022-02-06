import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-static-page-data-grid-action',
  templateUrl: './static-page-data-grid-action.component.html',
  styleUrls: ['./static-page-data-grid-action.component.scss']
})
export class StaticPageDataGridActionComponent implements OnInit {


  staticPageDataForm: FormGroup;
  pageNameList: any[] = [];
  public Editor = ClassicEditor;
  activeTab = 0;

  constructor(
    public dialogRef: MatDialogRef<StaticPageDataGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    public headerService: HeaderService,
    public adminBaseService: AdminBaseService
  ) { }

  ngOnInit(): any {
   
    this.staticPageDataForm = this.formBuilder.group({
      staticPageId: [this.row.data ? this.row.data.staticPageId : ''],
      staticPageName: this.formBuilder.group({
        staticPageNameId: [this.row.data ? this.row.data.staticPageName.staticPageNameId : '', [Validators.required]],
      }),
      staticPageContent: [this.row.data ? this.row.data.staticPageContent : '', [Validators.required]],
      staticPageContentArb: [this.row.data ? this.row.data.staticPageContentArb : '', [Validators.required]]
    });

    // Get all role types
    this.headerService.toggleSpinner(true);
    this.adminBaseService.requestSubmit('ADM_LIST_STATIC_PAGENAMES', null).subscribe((response) => {
      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.pageNameList = response.result.data;
          }
        }
        this.headerService.toggleSpinner(false);
      }
    },
      (error: any) => {
        this.headerService.toggleSpinner(false);
       
      });
  }
  get eform(): any { return this.staticPageDataForm.controls; }

  selectPage(event: any): any {

    const params = {
      staticPageName: this.pageNameList.find(data => data.staticPageNameId === event.value).staticPageName
    };
    this.adminBaseService.requestSubmit('ADM_GET_STATIC_DATA_BYPAGENAME', params).subscribe((response) => {
      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            if (response.result.data.length) {
              this.alertService.open(ResponseStatusModel.ERROR, 'Content already created for this page')
              this.staticPageDataForm.get('staticPageName.staticPageNameId').setValue('');
            }
          }
        }
        this.headerService.toggleSpinner(false);
      }
    },
      (error: any) => {
        this.headerService.toggleSpinner(false);
       
      });
  }

  onSubmit(): any {

    const action = this.row.data ? 'Edit' : 'New';
    if (this.staticPageDataForm.invalid) {
      if (!this.staticPageDataForm.get('staticPageContent').value) {
        this.activeTab = 0;
        this.alertService.open(ResponseStatusModel.ERROR, 'English page content is required');
      }
      if (!this.staticPageDataForm.get('staticPageContentArb').value) {
        this.activeTab = 1;
        this.alertService.open(ResponseStatusModel.ERROR, 'Arabic page content is required');
      }
      return false;
    }
    this.manageGridService.addORupdateRowData(ModuleKeyModel.pageData.key, this.row.data ? false : true, this.staticPageDataForm.value)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.pageData.name} ${this.row.data ? 'edited' : 'created'} successfully`);
            }
          }
        }
      },
        (error: any) => {
         
        });
  }
  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }
}
