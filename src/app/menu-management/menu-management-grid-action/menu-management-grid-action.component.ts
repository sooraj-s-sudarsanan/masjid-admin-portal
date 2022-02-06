import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AlertService } from 'src/app/core/services/alert.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-menu-management-grid-action',
  templateUrl: './menu-management-grid-action.component.html',
  styleUrls: ['./menu-management-grid-action.component.scss']
})
export class MenuManagementGridActionComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MenuManagementGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      menuName: [this.row.data ? this.row.data.menuName : '', [Validators.required, Validators.maxLength(50)]],
      menuUrl: [this.row.data ? this.row.data.menuUrl : '', [Validators.required, Validators.maxLength(50)]],
      menuId: [this.row.data ? this.row.data.menuId : '']
    });
  }
  get eform(): any { return this.form.controls; }
  onSubmit(): any {

    const action = this.row.data ? 'Edit' : 'New';
    if (this.form.invalid) {
      return false;
    }
    this.manageGridService.addORupdateRowData(ModuleKeyModel.menuManagement.key, this.row.data ? false : true, this.form.value)
    .subscribe((response) => {

      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.dialogRef.close({ action, rowValue: response.result.data });
            this.alertService.open
              (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.menuManagement.name} ${this.row.data ? 'edited' : 'created'} successfully`);
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
