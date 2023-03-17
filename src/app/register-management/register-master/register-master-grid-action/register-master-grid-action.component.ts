import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AlertService } from 'src/app/core/services/alert.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-register-master-grid-action',
  templateUrl: './register-master-grid-action.component.html',
  styleUrls: ['./register-master-grid-action.component.scss']
})
export class RegisterMasterGridActionComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RegisterMasterGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService) { }
    
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      registerName: [this.row.data ? this.row.data.registerName : '', [Validators.required, Validators.maxLength(50)]],
      registerNameML: [this.row.data ? this.row.data.registerNameML : '', [Validators.required, Validators.maxLength(50)]],
      registerDescription: [this.row.data ? this.row.data.registerDescription : '', [Validators.maxLength(500)]],
      registerDescriptionML: [this.row.data ? this.row.data.registerDescriptionML : '', [Validators.maxLength(500)]],
      registerDisplayName: [this.row.data ? this.row.data.registerDisplayName : '', [Validators.required, Validators.maxLength(50)]],
      registerDisplayNameML: [this.row.data ? this.row.data.registerDisplayNameML : '', [Validators.required, Validators.maxLength(50)]],
      registerMasterId: [this.row.data ? this.row.data.registerMasterId : '']
    });
  }
  get eform(): any { return this.form.controls; }
  onSubmit(): any {

    const action = this.row.data ? 'Edit' : 'New';
    if (this.form.invalid) {
      return false;
    }
    this.manageGridService.addORupdateRowData(ModuleKeyModel.registerMaster.key, this.row.data ? false : true, this.form.value)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.registerMaster.name} ${this.row.data ? 'edited' : 'created'} successfully`);
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
