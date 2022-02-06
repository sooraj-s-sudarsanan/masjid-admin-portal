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
  selector: 'app-loyality-scheme-grid-action',
  templateUrl: './loyality-scheme-grid-action.component.html',
  styleUrls: ['./loyality-scheme-grid-action.component.scss']
})
export class LoyalitySchemeGridActionComponent implements OnInit {
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<LoyalitySchemeGridActionComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    private headerService: HeaderService,
    private adminBaseService: AdminBaseService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      loyaltySchemeId:[this.row.data ? this.row.data.loyaltySchemeId : ''],
      loyaltySchemeName: [this.row.data ? this.row.data.loyaltySchemeName : '', [Validators.required, Validators.maxLength(50)]],
      loyaltySchemeDesc: [this.row.data ? this.row.data.loyaltySchemeDesc : '', [Validators.maxLength(256)]],
    });
  }
  get eform(): any { return this.form.controls; }

  onSubmit(): any {

    const action = this.row.data ? 'Edit' : 'New';
    if (this.form.invalid) {
      return false;
    }
    this.manageGridService.addORupdateRowData(ModuleKeyModel.loyalityScheme.key, this.row.data ? false : true, this.form.value)
      .subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ action, rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.loyalityScheme.name} ${this.row.data ? 'edited' : 'created'} successfully`);
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
