import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-cropper-dialog',
  templateUrl: './cropper-dialog.component.html',
  styleUrls: ['./cropper-dialog.component.scss']
})
export class CropperDialogComponent implements OnInit {
  croppedImage: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CropperDialogComponent>,
  ) {

  }

  ngOnInit(): void {
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64; 
  }
  imageLoaded() {
    // show cropper   
  }
  cropperReady() {
    // cropper ready
    // console.log('cropperReady');
  }
  loadImageFailed() {
    // show message
    // console.log('loadImageFailed');
  }

  Close(status) {

    this.dialogRef.close({
      status,
      croppedImage: this.croppedImage
    })
  }
}
