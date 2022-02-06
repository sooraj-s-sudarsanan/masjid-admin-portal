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
  selector: 'app-locality-grid-action',
  templateUrl: './locality-grid-action.component.html',
  styleUrls: ['./locality-grid-action.component.scss']
})
export class LocalityGridActionComponent implements OnInit {

  form: FormGroup;
  nationalityList: any;
  constructor(
    public dialogRef: MatDialogRef<LocalityGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      localityName: [this.row.data ? this.row.data.localityName : '', [Validators.required, Validators.maxLength(100)]],
      localityNameAR: [this.row.data ? this.row.data.localityNameAR : '', [Validators.required, Validators.maxLength(100)]],
      nationalityBean: this.formBuilder.group({
        nationalityId: [this.row.data ? this.row.data.nationalityBean ?
          this.row.data.nationalityBean.nationalityId : '' : '', [Validators.required]]
      }),
      localityCode: [this.row.data ? this.row.data.localityCode : '', [Validators.required]],
      localityId: [this.row.data ? this.row.data.localityId : ''],
    });

    this.headerService.toggleSpinner(true);
    this.adminBaseService.requestSubmit('ADM_LIST_NATIONALITY', null).subscribe((response) => {
      if (response) {
        if (response.result) {
          this.headerService.toggleSpinner(false);
          if (response.result.status === 'SUCCESS') {
            this.nationalityList = response.result.data;
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
    this.manageGridService.addORupdateRowData(ModuleKeyModel.localityModule.key, this.row.data ? false : true, this.form.value)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.localityModule.name} ${this.row.data ? 'edited' : 'created'} successfully`);
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
