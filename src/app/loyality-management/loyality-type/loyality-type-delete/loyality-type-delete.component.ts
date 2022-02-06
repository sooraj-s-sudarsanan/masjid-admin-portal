import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AlertService } from 'src/app/core/services/alert.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-loyality-type-delete',
  templateUrl: './loyality-type-delete.component.html',
  styleUrls: ['./loyality-type-delete.component.scss']
})
export class LoyalityTypeDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoyalityTypeDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public manageGridService: ManageGridService,
    public alertService: AlertService
  ) { }
  ngOnInit(): void {
  }
  deleteRowData(): any {

    if (this.row) {
      const params = {
        loyaltyTypeId: this.row.data.loyaltyTypeId
      };
      this.manageGridService.deleteRowData(ModuleKeyModel.loyalityType.key, params).subscribe((response) => {

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
