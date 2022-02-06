import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-faq-grid-action',
  templateUrl: './faq-grid-action.component.html',
  styleUrls: ['./faq-grid-action.component.scss']
})
export class FaqGridActionComponent implements OnInit {

  form: FormGroup;
  faqCategoryList: any;

  constructor(
    public dialogRef: MatDialogRef<FaqGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      faqId: [this.row.data ? this.row.data.faqId : null],
      faqItemName: [this.row.data ? this.row.data.faqItemName : '', [Validators.required, Validators.maxLength(10000)]],
      faqItemNameAR: [this.row.data ? this.row.data.faqItemNameAR : '', [Validators.required, Validators.maxLength(10000)]],
      faqItemAnswer: [this.row.data ? this.row.data.faqItemAnswer : '', [Validators.required, Validators.maxLength(50000)]],
      faqItemAnswerAR: [this.row.data ? this.row.data.faqItemAnswerAR : '', [Validators.required, Validators.maxLength(50000)]],
      faqType: this.formBuilder.group({
        faqTypeId: [this.row.data ? this.row.data.faqType ?
          this.row.data.faqType.faqTypeId : '' : '', [Validators.required]]
      }),
    });

    this.headerService.toggleSpinner(true);
    this.adminBaseService.requestSubmit('ADM_LIST_FAQTYPES', null).subscribe((response) => {
      if (response) {
        this.headerService.toggleSpinner(false);
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.faqCategoryList = response.result.data;
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
      return false;
    }
    this.manageGridService.addORupdateRowData(ModuleKeyModel.faq.key, this.row.data ? false : true, this.form.value)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.faq.name} ${this.row.data ? 'edited' : 'created'} successfully`);
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
