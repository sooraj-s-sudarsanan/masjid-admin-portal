import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AlertService } from 'src/app/core/services/alert.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';

@Component({
  selector: 'app-file-data-grid-action',
  templateUrl: './file-data-grid-action.component.html',
  styleUrls: ['./file-data-grid-action.component.scss']
})
export class FileDataGridActionComponent implements OnInit {

  fileDataForm: FormGroup;
  fileCategoryList: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<FileDataGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    public headerService: HeaderService,
    public formBuilder: FormBuilder,
    public adminBaseService: AdminBaseService  
  ) { }

  ngOnInit() {
    this.fileDataForm = this.formBuilder.group({
      fileName: [this.row.data ? this.row.data.fileName : ''],     
      fileCategory: [this.row.data ? this.row.data.fileCategory : false, [Validators.required, Validators.maxLength(50)]],
      fileContent: [this.row.data ? this.row.data.fileContent : ''],
      fileId: [this.row.data ? this.row.data.fileId : '']
    });

    if (this.row.data == null) {
      this.fileDataForm.get('fileContent').setValidators([Validators.required]);
    } 
    this.headerService.toggleSpinner(true);   
    this.adminBaseService.requestSubmit('ADM_LIST_FILE_CATEGORY', null).subscribe((response) => {
      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.fileCategoryList = response.result.data;          
          }
        }
        this.headerService.toggleSpinner(false);
      }
    },
      (error: any) => {
        this.headerService.toggleSpinner(false);
        
      });
  }
  get eform() { return this.fileDataForm.controls; }

  onSubmit() {

    const action = this.row.data ? 'Edit' : 'New';
    if (this.fileDataForm.invalid) {
      return false;
    }
    this.manageGridService.addORupdateRowData(ModuleKeyModel.fileData.key, this.row.data ? false : true, this.fileDataForm.value).subscribe((response) => {

      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.dialogRef.close({ action, rowValue: response.result.data });
            this.alertService.open
            (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.fileData.name} ${this.row.data ? 'edited' : 'created'} successfully`);
          }
        }
      }
    },
      (error: any) => {
        
      });

  }

  handleFileSelect(evt) {

    const files = evt.target.files;
    const file = files[0];
    if (files && file) {
      this.fileDataForm.get('fileName').setValue(file.name);
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }


  _handleReaderLoaded(readerEvt) {
    (btoa(readerEvt.target.result));
    (this.fileDataForm.get('fileContent').setValue(btoa(readerEvt.target.result)));
  }

  get moduleKeyModel() {
    return ModuleKeyModel;
  }


}
