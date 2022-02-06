import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-grid-action',
  templateUrl: './grid-action.component.html',
  styleUrls: ['./grid-action.component.scss']
})
export class GridActionComponent implements OnInit {

  networkManageForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<GridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public manageGridService: ManageGridService,
    public formBuilder: FormBuilder,
    public alertService: AlertService) { }


  get eform(): any { return this.networkManageForm.controls; }

  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }

  ngOnInit(): void {

    this.networkManageForm = this.formBuilder.group({
      networkId: [this.row.data ? this.row.data.networkId : ''],
      networkName: [this.row.data ? this.row.data.networkName : '', [Validators.required, Validators.maxLength(50)]],
      networkNameAR: [this.row.data ? this.row.data.networkNameAR : '', [Validators.required, Validators.maxLength(50)]],
      networkDescription: [this.row.data ? this.row.data.networkDescription : '', [Validators.maxLength(500)]],
      networkDescriptionAR: [this.row.data ? this.row.data.networkDescriptionAR : '', [Validators.maxLength(500)]],
      networkDisplayPriority: [this.row.data ? this.row.data.networkDisplayPriority : 1]
    });
  }

  onSubmit(): any {

    const action = this.row.data ? 'Edit' : 'New';
    if (this.networkManageForm.invalid) {
      return false;
    }
    this.manageGridService
      .addORupdateRowData(ModuleKeyModel.networkManagement.key, this.row.data ? false : true, this.networkManageForm.value)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.networkManagement.name} ${this.row.data ? 'Edited' : 'Created'} successfully`);
            }
          }
        }
      },
        (error: any) => {
          console.log(error);
        });
  }

}
