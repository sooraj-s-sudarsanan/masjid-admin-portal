import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingStatusTextModel } from 'src/app/core/model/common-model';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AlertService } from 'src/app/core/services/alert.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-appoinment-cancel',
  templateUrl: './appoinment-cancel.component.html',
  styleUrls: ['./appoinment-cancel.component.scss']
})
export class AppoinmentCancelComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AppoinmentCancelComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public manageGridService: ManageGridService,
    public alertService: AlertService
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
      this.manageGridService.deleteRowData(ModuleKeyModel.appointment.key, params).subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {

              this.dialogRef.close({ action: 'Delete' });
              this.alertService.open(ResponseStatusModel.SUCCESS, response.result.data);
            }
          }
        }
      },
        (error: any) => {
       
        });
    }

  }
}
