import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AlertService } from 'src/app/core/services/alert.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-divorce-register-delete',
  templateUrl: './divorce-register-delete.component.html',
  styleUrls: ['./divorce-register-delete.component.scss']
})
export class DivorceRegisterDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DivorceRegisterDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public manageGridService: ManageGridService,
    public alertService: AlertService
  ) { }


  ngOnInit(): void {
  }

  deleteRowData(): any {

    if (this.row) {
      const params = {
        divorceId: this.row.data.divorceId
      };
      this.manageGridService.deleteRowData(ModuleKeyModel.divorceRegister.key, params).subscribe((response) => {

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
