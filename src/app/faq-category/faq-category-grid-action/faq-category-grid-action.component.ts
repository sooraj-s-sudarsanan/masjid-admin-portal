import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AlertService } from 'src/app/core/services/alert.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-faq-category-grid-action',
  templateUrl: './faq-category-grid-action.component.html',
  styleUrls: ['./faq-category-grid-action.component.scss']
})
export class FaqCategoryGridActionComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FaqCategoryGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      faqTypeName: [this.row.data ? this.row.data.faqTypeName : '', [Validators.required, Validators.maxLength(100)]],
      faqTypeNameAR: [this.row.data ? this.row.data.faqTypeNameAR : '', [Validators.required, Validators.maxLength(100)]],
      faqTypeDesc: [this.row.data ? this.row.data.faqTypeDesc : '', [Validators.maxLength(500)]],
      faqTypeDescAR: [this.row.data ? this.row.data.faqTypeDescAR : '', [Validators.maxLength(500)]],
      faqTypeId: [this.row.data ? this.row.data.faqTypeId : '']
    });
  }


  get eform(): any { return this.form.controls; }

  onSubmit(): any {

    const action = this.row.data ? 'Edit' : 'New';
    if (this.form.invalid) {
      return false;
    }
    this.manageGridService.addORupdateRowData(ModuleKeyModel.faqCategoryModule.key, this.row.data ? false : true, this.form.value)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.countryModule.name} ${this.row.data ? 'edited' : 'created'} successfully`);
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
