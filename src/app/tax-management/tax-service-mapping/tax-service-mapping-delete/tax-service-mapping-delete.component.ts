import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AlertService } from 'src/app/core/services/alert.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-tax-service-mapping-delete',
  templateUrl: './tax-service-mapping-delete.component.html',
  styleUrls: ['./tax-service-mapping-delete.component.scss']
})
export class TaxServiceMappingDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TaxServiceMappingDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public manageGridService: ManageGridService,
    public alertService: AlertService
  ) { }

  ngOnInit(): void {
  }
  deleteRowData(): any {

    if (this.row) {
      const params = {
        taxServiceMappingId: this.row.data.taxServiceMappingId
      };
      this.manageGridService.deleteRowData(ModuleKeyModel.taxMapping.key, params).subscribe((response) => {

        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {

              this.dialogRef.close({ action: 'Delete', taxComponentId: this.row.data.taxComponentId });
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
