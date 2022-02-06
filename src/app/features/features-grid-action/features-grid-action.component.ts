import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-features-grid-action',
  templateUrl: './features-grid-action.component.html',
  styleUrls: ['./features-grid-action.component.scss']
})
export class FeaturesGridActionComponent implements OnInit {

  form: FormGroup;
  planTypeFC = new FormControl();
  planList: any;

  constructor(
    public dialogRef: MatDialogRef<FeaturesGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      featureName: [this.row.data ? this.row.data.featureName : '', [Validators.required, Validators.maxLength(100)]],
      featureDesc: [this.row.data ? this.row.data.featureDesc : '', [Validators.maxLength(1000)]],
      featureDisplayOrder: [this.row.data ? this.row.data.featureDisplayOrder : '', [Validators.required, Validators.maxLength(100)]],
      planTypePrice: [this.row.data ? this.row.data.planTypePrice : ''], 
      planTypes: [this.row.data ? this.row.data.planTypes : [], [Validators.required]], 
      featureId: [this.row.data ? this.row.data.featureId : '']
    });

    this.headerService.toggleSpinner(true);
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

    if (this.row.data) {
      if (this.row.data.planTypes) {
        const planTypesList=[];
        this.row.data.planTypes.forEach(element => {
          planTypesList.push(element.planTypeId);
        });
       
        this.planTypeFC.setValue(planTypesList);
      }
    }
  }
  get eform(): any { return this.form.controls; }

  onSubmit(): any {

    const action = this.row.data ? 'Edit' : 'New';
    if (this.form.invalid) {
      return false;
    }
    this.manageGridService.addORupdateRowData(ModuleKeyModel.features.key, this.row.data ? false : true, this.form.value)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.features.name} ${this.row.data ? 'edited' : 'created'} successfully`);
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

  planTypeSelect($event) {
    const list = [];
    if ($event.value) {
      $event.value.forEach(element => {
        list.push(
          {
            planTypeId: element
          }
        )
      });
      this.form.get('planTypes').setValue(list);      
    } else {
      this.form.get('planTypes').setValue([]);
    }
  }
}
