import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingStatusTextModel } from 'src/app/core/model/common-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { ManageGridService } from 'src/app/core/services/manage-grid.service';
import { saveAs as FileSaver } from 'file-saver';

@Component({
  selector: 'app-download-report',
  templateUrl: './download-report.component.html',
  styleUrls: ['./download-report.component.scss']
})
export class DownloadReportComponent implements OnInit {
  reportList = [];

  constructor(
    public dialogRef: MatDialogRef<DownloadReportComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public manageGridService: ManageGridService,
    public alertService: AlertService,
    public adminBaseService: AdminBaseService
  ) { }

  ngOnInit(): any {

    if (this.row.data) {

      if (this.row.data.bookingStatus != BookingStatusTextModel.BKG_CMPLT) {
        this.alertService.open(ResponseStatusModel.ERROR, 'Appoinment not Completed.');
        this.dialogRef.close();
      } else {
        const params = {
          filter: `branchId==${this.row.data.branchId}`,
          limit: 10,
          page: 1,
          sortBy: "createdOn",
          sortOrder: "DESC"
        };
        this.adminBaseService.requestSubmit('ADM_LIST_REPORT_CONFIG_PAGED', params).subscribe((response) => {

          if (response) {
            if (response.result) {
              if (response.result.status === 'SUCCESS') {
                this.reportList = response.result.data;
                if(this.reportList.length==1){
                 if(this.reportList[0].reportType.reportTypeCode=='INVOICE'){
                   this.download(this.reportList[0]);
                   setTimeout(() => {
                    this.dialogRef.close();
                    this.alertService.open(ResponseStatusModel.SUCCESS, `${this.reportList[0].reportType.reportTypeName} file start downloading.`)
                   }, 100);
                 }
                }
              }
            }
          }
        },
          (error: any) => {
          });
      }
    }
  }

  download(config) {
    let params = {
      bookingId: this.row.data.bookingId,
      reportTypeId: config.reportType.reportTypeId
    };
    this.adminBaseService.requestSubmit('ADM_CREATE_INVOICE_BY_BOOKING', params).subscribe((response) => {

      if (response) {
        if (response.result) {
          if (response.result.status === 'SUCCESS' && response.result.data) {
            const fileName = response.result.data.substring(response.result.data.lastIndexOf('/') + 1);
            if (fileName) {
              FileSaver(response.result.data, fileName);
            }
          }
        }
      }
    },
      (error: any) => {
      });
  }
}
