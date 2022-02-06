import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-merchant-grid-action',
  templateUrl: './merchant-grid-action.component.html',
  styleUrls: ['./merchant-grid-action.component.scss']
})
export class MerchantGridActionComponent implements OnInit {

  form: FormGroup;
  categoryList: any;
  pswdPolicy = '^((?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@.$!%*?&])[A-Za-z\\d@.$!%*?&]{8,15})$';
  planList: any;
  categoryFC = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<MerchantGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      merchantName: [this.row.data ? this.row.data.merchantName : '', [Validators.required, Validators.maxLength(200)]],
      merchantNameAR: [this.row.data ? this.row.data.merchantNameAR : '', [Validators.required, Validators.maxLength(200)]],
      merchantDescription: [this.row.data ? this.row.data.merchantDescription : '', [Validators.maxLength(1000)]],
      merchantDescriptionAR: [this.row.data ? this.row.data.merchantDescriptionAR : '', [Validators.maxLength(1000)]],
      merchantContactName: [this.row.data ? this.row.data.merchantContactName : '', [Validators.required, Validators.maxLength(200)]],
      merchantContactPhone: [this.row.data ? this.row.data.merchantContactPhone : '', [Validators.required, Validators.maxLength(20)]],
      merchantContactMobile: [this.row.data ? this.row.data.merchantContactMobile : '', [Validators.required, Validators.maxLength(20)]],
      merchantContactEmail: [this.row.data ? this.row.data.merchantContactEmail : '',
      [Validators.required, Validators.email, Validators.maxLength(100)]],
      merchantLoginPassword: [this.row.data ? this.row.data.merchantLoginPassword : '',
      [Validators.required, Validators.pattern(this.pswdPolicy)]],
      category: [this.row.data ? this.row.data.category ? this.row.data.category : [] : [], [Validators.required]],
      merchantId: [this.row.data ? this.row.data.merchantId : ''],
      planTypeCode: [this.row.data ? this.row.data.planTypeCode : '', [Validators.required]],
      termsAndCondition: [this.row.data ? this.row.data.termsAndCondition:''],
    });

    if (this.row.data) {
      if (this.row.data.category) {
        const categoryList=[];
        this.row.data.category.forEach(element => {
          categoryList.push(element.categoryId);
        });        
        this.categoryFC.setValue(categoryList);
      }
    }
   
    // Get all Categories
    this.headerService.toggleSpinner(true);
    this.adminBaseService.requestSubmit('ADM_LIST_CATEGORY', null).subscribe((response) => {
      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.categoryList = response.result.data;

            this.adminBaseService.requestSubmit('ADM_LIST_PLANTYPE', null).subscribe((planResponse) => {
              if (planResponse) {
                if (planResponse.result) {
                  if (planResponse.result.status === 'SUCCESS') {
                    this.planList = planResponse.result.data;
                    this.headerService.toggleSpinner(false);
                  }
                }
              }
            });

          }
        }

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
      this.alertService.open
      (ResponseStatusModel.ERROR, `Please check mandatory fields or invalid values`);
      return false;
    }
    this.manageGridService.addORupdateRowData(ModuleKeyModel.merchant.key, this.row.data ? false : true, this.form.value)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.merchant.name} ${this.row.data ? 'edited' : 'created'} successfully`);
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

  categorySelect($event) {
    const categoryList = [];
    if ($event.value) {
      $event.value.forEach(element => {
        categoryList.push(
          {
            categoryId: element
          }
        )
      });
      this.form.get('category').setValue(categoryList);
     
    } else {
      this.form.get('category').setValue([]);
    }
  }
}
