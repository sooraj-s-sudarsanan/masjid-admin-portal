import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-weblink',
  templateUrl: './weblink.component.html',
  styleUrls: ['./weblink.component.scss']
})
export class WeblinkComponent implements OnInit {

  form: FormGroup;
  customerWebBaseUrl=`${environment.customerWebBaseUrl}branch/details/`;

  constructor(
    @Inject(MAT_DIALOG_DATA) public row: any,
    public dialogRef: MatDialogRef<WeblinkComponent>,
    public formBuilder: FormBuilder,
    public adminBaseService: AdminBaseService,
    public alertService: AlertService
  ) { }

  ngOnInit(): void {
    if (this.row.data) {
      
      this.form = this.formBuilder.group({
        branchId: [this.row.data ? this.row.data.branchId : '',
        [Validators.required, Validators.maxLength(200)]],
        branchLink: [this.row.data ? this.row.data.branchLink : '',
        [Validators.required, Validators.maxLength(100), Validators.pattern('^(?!.{51,})(\\w+?)$')]]
      })
    } else {
      this.dialogRef.close();
    }
  }
  get eform(): any { return this.form.controls; }

  onSubmit(): any {
    if (this.form.invalid) {
      return false;
    }

    const params = {
      branchId: this.row.data.branchId
    };
    this.adminBaseService.requestSubmit('ADM_ADD_BRANCH_LINK', this.form.value).subscribe((response) => {

      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS') {
            this.dialogRef.close({ action:'Edit', rowValue: response.result.data });
            this.alertService.open(ResponseStatusModel.SUCCESS, 'Web Link updated successfully.');
          }
        }
      }
    },
      (error: any) => {
      });
  }

}
