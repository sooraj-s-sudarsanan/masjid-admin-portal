import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public manageGridService: ManageGridService,
    public alertService: AlertService
  ) { }

  ngOnInit(): void {
  }

  deleteRowData(): any {

    if (this.row) {
      const params = {
        networkId: this.row.data.networkId
      };
      this.manageGridService.deleteRowData(ModuleKeyModel.networkManagement.key, params).subscribe((response) => {

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
