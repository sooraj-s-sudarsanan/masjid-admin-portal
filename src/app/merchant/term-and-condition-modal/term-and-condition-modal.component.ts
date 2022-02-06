import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-term-and-condition-modal',
  templateUrl: './term-and-condition-modal.component.html',
  styleUrls: ['./term-and-condition-modal.component.scss']
})
export class TermAndConditionModalComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subscriptions: Subscription[] = [];
  termAndCondition = `${environment.customerWebBaseUrl}page/Terms%20&%20Conditions`;
  categoryList: any;
  categoryFC = new FormControl();
  planList: any;
  
  constructor(
    private dialogRef: MatDialogRef<TermAndConditionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    private headerService: HeaderService,
    public alertService: AlertService,
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
      merchantContactEmail: [{value : this.row.data ? this.row.data.merchantContactEmail : '',  disabled: true},
      [Validators.required, Validators.email, Validators.maxLength(100)]],
      merchantLoginPassword: [this.row.data ? this.row.data.merchantLoginPassword : '',
      [Validators.required]],
      category: [this.row.data ? this.row.data.category ? this.row.data.category : [] : [], [Validators.required]],
      merchantId: [this.row.data ? this.row.data.merchantId : ''],
      planTypeCode: [this.row.data ? this.row.data.planTypeCode : '', [Validators.required]],
      termsAndCondition: [this.row.data ? this.row.data.termsAndCondition : ''],
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

  onSubmit() {
    if (this.form.valid) {
      const request = this.form.value;
      request.termsAndCondition = 'ACCEPTED';
      // console.log(request)
      this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_UPDATE_MERCHANT',
        request).subscribe(response => {         
          if (response.result.status === ResponseStatusModel.SUCCESS) {
            this.dialogRef.close();
            this.alertService.open(ResponseStatusModel.SUCCESS, 'Successfully updated merchant informations.');
          }
        }));
    }
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
