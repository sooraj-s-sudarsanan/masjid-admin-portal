import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AlertService } from 'src/app/core/services/alert.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';

@Component({
  selector: 'app-faq-delete',
  templateUrl: './faq-delete.component.html',
  styleUrls: ['./faq-delete.component.scss']
})
export class FaqDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FaqDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public manageGridService: ManageGridService,
    public alertService: AlertService
  ) { }


  ngOnInit(): void {
  }
  deleteRowData(): any {

    if (this.row) {
      const params = {
        faqId: this.row.data.faqId
      };
      this.manageGridService.deleteRowData(ModuleKeyModel.faq.key, params).subscribe((response) => {

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
