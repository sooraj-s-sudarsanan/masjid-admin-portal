import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Subscription } from 'rxjs';
import { CropperDialogComponent } from 'src/app/core/cropper-dialog/cropper-dialog.component';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';
import { ResponseStatusModel } from 'src/app/core/model/response-status-model';
import { AdminBaseService } from 'src/app/core/services/admin-base.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  fileName = null;
  fileURL = null;
  fileCategory = 'THUMBNAIL_MOB';
  fileContent = null;
  branchBean = null;
  @ViewChild('imgFile') imgFileRef: ElementRef;
  imageChangedEvent: any = '';
  croppedImage: any = null;
  imageChoosed = false;
  uploadedBranchImgList = [];
  dialogRefImageCrop: any;

  constructor(
    public dialogRefAddFile: MatDialogRef<AddFileComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public adminBaseService: AdminBaseService,
    public alertService: AlertService,
    private headerService: HeaderService,
    private ng2ImgMax: Ng2ImgMaxService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    if (this.row) {
      this.branchBean = {
        branchId: this.row.data.branchId
      };

      this.headerService.toggleSpinner(true);
      const requestParams =
      {
        filter: `branchBean.branchId==${this.row.data.branchId}##fileCategory==THUMBNAIL_MOB`,
        "sortBy": "",
        "sortOrder": "ASC"
      };
      this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_LIST_FILEDATA', requestParams).subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.uploadedBranchImgList = response.result.data;
            }
          }
          this.headerService.toggleSpinner(false);
        }
      },
        (error: any) => {
          this.headerService.toggleSpinner(false);

        }));
    }
  }

  submit($event): any {
    if (this.fileName && this.croppedImage && this.branchBean) {
      this.headerService.toggleSpinner(true);
      const requestParams = {
        fileName: this.fileName,
        fileURL: this.fileURL,
        fileCategory: this.fileCategory,
        fileContent: this.croppedImage.split(',')[1],
        branchBean: this.branchBean
      };

      this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_ADD_FILEDATA', requestParams).subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.imgFileRef.nativeElement.value = '';
              this.croppedImage = null;
              this.imageChangedEvent = null;
              this.imageChoosed = false;
              this.alertService.open
                (ResponseStatusModel.SUCCESS, `File data uploaded successfully`);
              this.uploadedBranchImgList.push(response.result.data);
            }
          }
          this.headerService.toggleSpinner(false);
        }
      },
        (error: any) => {
          this.headerService.toggleSpinner(false);

        }));
    }
  }

  cancel($event) {
    this.dialogRefAddFile.close({ action: 'Reload' });
  }


  // fileChangeEvent(event: any): any {
  //   this.headerService.toggleSpinner(true);
  //   const files = event.target.files;
  //   const file = files[0];
  //   if (files && file) {
  //     if (((file.size / 1024) / 1024) > 2.5) {
  //       this.alertService.open
  //         (ResponseStatusModel.ERROR, `Maximum upload file size 2.5 MB`);
  //       this.headerService.toggleSpinner(false);
  //       return false;
  //     } else {
  //       this.imageChoosed = true;
  //       this.fileName = file.name;
  //       this.imageChangedEvent = event;
  //     }
  //   }
  // }


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    const files = event.target.files;
    const file = files[0];
    if (files && file) {
      this.fileName = file.name;
      this.cropImage();
    }
  }

  cropImage() {
    this.dialogRefImageCrop = this.dialog.open(CropperDialogComponent, {
      width: '500px',
      height: '500px',
      data: {
        title: 'Branch Logo',
        imageChangedEvent: this.imageChangedEvent,
        aspectRatio: [16, 9]
      }
    });

    this.subscriptions.push(this.dialogRefImageCrop.afterClosed().subscribe(result => {
      if (result) {
        if (result.status == 'yes') {
          if (result.croppedImage) {
            this.croppedImage = result.croppedImage;
            this.submit(null);
          }
        }
      }
    }));
  }

  delete(item, i) {
    if (item) {
      this.headerService.toggleSpinner(true);
      const requestParams =
      {
        fileId: item.fileId
      };
      this.subscriptions.push(this.adminBaseService.requestSubmit('ADM_DELETE_FILEDATA_BYID', requestParams).subscribe((response) => {
        if (response) {
          if (response.result) {
            if (response.result.status === 'SUCCESS') {
              this.uploadedBranchImgList.splice(i, 1);
              this.alertService.open
                (ResponseStatusModel.SUCCESS, response.result.data);
            }
          }
          this.headerService.toggleSpinner(false);
        }
      },
        (error: any) => {
          this.headerService.toggleSpinner(false);

        }));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
