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
  selector: 'app-sub-module-grid-action',
  templateUrl: './sub-module-grid-action.component.html',
  styleUrls: ['./sub-module-grid-action.component.scss']
})
export class SubModuleGridActionComponent implements OnInit {

  form: FormGroup;
  moduleList = [];
  selected: any;

  constructor(
    public dialogRef: MatDialogRef<SubModuleGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      submoduleName: [this.row.data ? this.row.data.submoduleName : '', [Validators.required, Validators.maxLength(50)]],
      submoduleUrl: [this.row.data ? this.row.data.submoduleUrl : '', [Validators.required, Validators.maxLength(50)]],
      submoduleId: [this.row.data ? this.row.data.submoduleId : ''],
      modules: this.formBuilder.group({
        moduleId: [this.row.data ? this.row.data.modules ? this.row.data.modules.moduleId : '' : '', [Validators.required]]
      }),
      subModuleCSSLink: [this.row.data ? this.row.data.subModuleCSSLink : '', [Validators.maxLength(50)]],
      submoduleSortOrder: [this.row.data ? this.row.data.submoduleSortOrder : '', [Validators.required]]
    });
    // Get all role types
    this.headerService.toggleSpinner(true);
    this.adminBaseService.requestSubmit('ADM_LIST_MODULE', null).subscribe((response) => {
      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.moduleList = response.result.data;        
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
    this.manageGridService.addORupdateRowData(ModuleKeyModel.subModule.key, this.row.data ? false : true, this.form.value)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.subModule.name} ${this.row.data ? 'edited' : 'created'} successfully`);
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
