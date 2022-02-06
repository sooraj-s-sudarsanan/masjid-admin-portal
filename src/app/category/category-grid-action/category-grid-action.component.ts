import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AlertService } from 'src/app/core/services/alert.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';
import { AdminBaseService } from 'src/app/core/services/admin-base.service'
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-category-grid-action',
  templateUrl: './category-grid-action.component.html',
  styleUrls: ['./category-grid-action.component.scss']
})
export class CategoryGridActionComponent implements OnInit {

  form: FormGroup;
  categoryList = [];
  selected: any;
  iconList: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<CategoryGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    public headerService: HeaderService,
    public adminBaseService: AdminBaseService
  ) { }
  ngOnInit(): any {

    this.form = this.formBuilder.group({
      categoryName: [this.row.data ? this.row.data.categoryName : '', [Validators.required, Validators.maxLength(50)]],
      categoryNameAR: [this.row.data ? this.row.data.categoryNameAR : '', [Validators.required, Validators.maxLength(50)]],
      categoryId: [this.row.data ? this.row.data.categoryId : ''],
      networkType: this.formBuilder.group({
        networkId: [this.row.data ? this.row.data.networkType ? this.row.data.networkType.networkId : '' : '', [Validators.required]]
      }),
      categoryDescription: [this.row.data ? this.row.data.categoryDescription : '', [Validators.maxLength(50)]],
      categoryDescriptionAR: [this.row.data ? this.row.data.categoryDescriptionAR : '', [Validators.required]],
      categoryDisplayName: [this.row.data ? this.row.data.categoryDisplayName : '', [Validators.required]],
      categoryPriority: [this.row.data ? this.row.data.categoryPriority : null],
      //fileId: [this.row.data ? this.row.data.fileId : '']
      categorySelectedIconWeb: this.formBuilder.group({
        fileId: [this.row.data ? this.row.data.categorySelectedIconWeb ? this.row.data.categorySelectedIconWeb.fileId : null : null]
      }),
      categorySelectedIconMob: this.formBuilder.group({
        fileId: [this.row.data ? this.row.data.categorySelectedIconMob ? this.row.data.categorySelectedIconMob.fileId : null : null]
      }),
      categoryDeselectedIconMob: this.formBuilder.group({
        fileId: [this.row.data ? this.row.data.categoryDeselectedIconMob ? this.row.data.categoryDeselectedIconMob.fileId : null : null]
      })
    });
    // Get all role types
    this.headerService.toggleSpinner(true);
    this.adminBaseService.requestSubmit('ADM_LIST_NETWORKS', null).subscribe((response) => {
      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.categoryList = response.result.data;
          }
        }
        const request = {
          filter: `fileCategory==CATEGORY_ICON`,
          sortBy: '',
          sortOrder: 'ASC'
        };
        this.adminBaseService.requestSubmit('ADM_LIST_FILEDATA', request).subscribe((response) => {
          if (response) {
            if (response.result) {
              if (response.result.status === 'SUCCESS') {
                this.iconList = response.result.data;
              }
            }
          }
        });
        this.headerService.toggleSpinner(false);
      }
    },
      (error: any) => {
        this.headerService.toggleSpinner(false);
        
      });
  }
  get eform(): any { return this.form.controls; }
  onSubmit(): any {

    const action = this.row.data ? 'Edit' : 'New';
    if (this.form.invalid) {
      return false;
    }
    const requestBody = this.form.value;
    if (!this.form.get('categorySelectedIconWeb.fileId').value) {
      delete requestBody.categorySelectedIconWeb;
    }
    if (!this.form.get('categorySelectedIconMob.fileId').value) {
      delete requestBody.categorySelectedIconMob;
    }
    if (!this.form.get('categoryDeselectedIconMob.fileId').value) {
      delete requestBody.categoryDeselectedIconMob;
    }

    if (!requestBody.categoryId) {
      delete requestBody.categoryId;
    }

    this.manageGridService.addORupdateRowData(ModuleKeyModel.category.key, this.row.data ? false : true, requestBody)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.category.name} ${this.row.data ? 'edited' : 'created'} successfully`);
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
  searchIcon(term: string, item: any) {
    term = term.toLowerCase();
    return item.fileName.toLowerCase().indexOf(term) > -1;
  }
}
