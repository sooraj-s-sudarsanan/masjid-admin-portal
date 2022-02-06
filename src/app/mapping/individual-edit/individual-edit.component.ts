import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-individual-edit',
  templateUrl: './individual-edit.component.html',
  styleUrls: ['./individual-edit.component.scss']
})
export class IndividualEditComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<IndividualEditComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    private adminBaseService: AdminBaseService
  ) { }

  ngOnInit(): void {
    if (!this.row.data) {
      this.alertService.open(ResponseStatusModel.ERROR, 'Mapping data are missing.')
      this.dialogRef.close();
    }   
    this.form = this.formBuilder.group({
      serviceMappingId: [this.row.data ? this.row.data.serviceMappingId : '', [Validators.required]],
      numberOfBookingAllowed: [this.row.data ? this.row.data.numberOfBookingAllowed : '', [Validators.required]],
      servicePersonLevelBooking: [this.row.data ? this.row.data.servicePersonLevelBooking : ''],
      servicePersonStartTime: [this.row.data ? this.row.data.servicePersonStartTime : '', [Validators.required]],
      servicePersonEndTime: [this.row.data ? this.row.data.servicePersonEndTime : '', [Validators.required]],
      servicePersonAvgDuration: [this.row.data ? this.row.data.servicePersonAvgDuration : '', [Validators.required]],
      servicePrice: [this.row.data ? this.row.data.servicePrice : ''],
      services: this.formBuilder.group({
        serviceId: [this.row.data ? this.row.data.serviceId : '', [Validators.required]]
      }),
      branch: this.formBuilder.group({
        branchId: [this.row.data ? this.row.data.branchId : null, [Validators.required]]
      }),
      servicePerson: [this.row.data ? this.row.data.servicePerson : []],
      offers: [this.row.data ? this.row.data.offers : null],
      allowRepeatedBooking: [this.row.data ? this.row.data.allowRepeatedBooking == 'true' ? true : false : false]
    });

  }
  get eform(): any { return this.form.controls; }
  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }
  onSubmit(): any {

    if (this.form.invalid) {
      this.alertService.open
        (ResponseStatusModel.ERROR, `Please check mandatory fields or invalid values`);
      return false;
    }
    this.manageGridService.addORupdateRowData(ModuleKeyModel.mapping.key, false, this.form.value)
      .subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.dialogRef.close({ rowValue: response.result.data });
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `${ModuleKeyModel.mapping.name} updated successfully`);
            }
          }
        }
      },
        (error: any) => {

        });
  }

}

