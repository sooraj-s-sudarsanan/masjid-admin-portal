import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingStatusTextModel } from 'src/app/core/model/common-model';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { BookingStatusCodeModel } from 'src/app/core/model/SlotStatus-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-appoinment-completed',
  templateUrl: './appoinment-completed.component.html',
  styleUrls: ['./appoinment-completed.component.scss']
})
export class AppoinmentCompletedComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AppoinmentCompletedComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    public adminBaseService: AdminBaseService
  ) { }

  ngOnInit(): any {

    if (this.row.data) {
      if (this.row.data.bookingStatus == BookingStatusTextModel.BKG_CMPLT) {
        this.alertService.open(ResponseStatusModel.ERROR, 'Booking already Completed.');
        this.dialogRef.close();
      }
    }
  }

  deleteRowData(): any {

    if (this.row) {
      const params = {
        bookingId: this.row.data.bookingId
      };
      this.adminBaseService.requestSubmit('ADM_UPDATE_BOOKING_COMPLETED', params).subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.alertService.open(ResponseStatusModel.SUCCESS, 'Appoinment completed successfully.');
              this.dialogRef.close({ action: 'Reload' });
            }
          }
        }
      },
        (error: any) => {
        });
    }

  }

}
