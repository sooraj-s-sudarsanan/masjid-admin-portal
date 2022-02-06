import { Component, OnInit, Inject } from '@angular/core';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';

@Component({
  selector: 'app-notifications-delete',
  templateUrl: './notifications-delete.component.html',
  styleUrls: ['./notifications-delete.component.scss']
})
export class NotificationsDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NotificationsDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public manageGridService: ManageGridService,
    public alertService: AlertService
  ) { }

  ngOnInit() {
  }
  deleteRowData() {

    if (this.row) {

      const params = {
        notifId: this.row.data.notifId
      };
      
      this.manageGridService.deleteRowData(ModuleKeyModel.notifications.key, params).subscribe((response) => {

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
          console.log(error);
        });
    }

  }
}
