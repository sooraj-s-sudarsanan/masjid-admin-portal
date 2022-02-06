import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';

@Component({
  selector: 'app-file-data-delete',
  templateUrl: './file-data-delete.component.html',
  styleUrls: ['./file-data-delete.component.scss']
})
export class FileDataDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FileDataDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public manageGridService: ManageGridService,
    public alertService: AlertService
  ) { }

  ngOnInit() {
  }

  deleteRowData() {

    if (this.row) {
      const params = {
        fileId: this.row.data.fileId
      };
      this.manageGridService.deleteRowData(ModuleKeyModel.fileData.key, params).subscribe((response) => {

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
