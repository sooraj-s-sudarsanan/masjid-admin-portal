import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-service-grid-action',
  templateUrl: './service-grid-action.component.html',
  styleUrls: ['./service-grid-action.component.scss']
})
export class ServiceGridActionComponent implements OnInit {

  form: FormGroup;
  categoryList: any;

  constructor(
    public dialogRef: MatDialogRef<ServiceGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      serviceName: [this.row.data ? this.row.data.serviceName : '', [Validators.required, Validators.maxLength(100)]],
      serviceNameAR: [this.row.data ? this.row.data.serviceNameAR : '', [Validators.required, Validators.maxLength(100)]],
      ServiceDescription: [this.row.data ? this.row.data.ServiceDescription : '', [Validators.maxLength(1000)]],
      serviceDescriptionAR: [this.row.data ? this.row.data.serviceDescriptionAR : '', [Validators.maxLength(1000)]],
      category: this.formBuilder.group({
        categoryId: [this.row.data ? this.row.data.category ? this.row.data.category.categoryId : '' : '', [Validators.required]]
      }),
      serviceId: [this.row.data ? this.row.data.serviceId : ''],
    });

    // Get all Categories
    this.headerService.toggleSpinner(true);
    this.adminBaseService.requestSubmit('ADM_LIST_CATEGORY', null).subscribe((response) => {
      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.categoryList = response.result.data;
          }
        }
        this.headerService.toggleSpinner(false);
      }
    },
      (error: any) => {
        this.headerService.toggleSpinner(false);
        console.log(error);
      });
  }
  get eform(): any { return this.form.controls; }
  onSubmit(): any {

    const action = this.row.data ? 'Edit' : 'New';
    if (this.form.invalid) {
      return false;
    }
    this.manageGridService.addORupdateRowData(ModuleKeyModel.service.key, this.row.data ? false : true, this.form.value)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.service.name} ${this.row.data ? 'edited' : 'created'} successfully`);
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
