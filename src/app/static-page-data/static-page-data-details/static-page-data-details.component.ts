import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-static-page-data-details',
  templateUrl: './static-page-data-details.component.html',
  styleUrls: ['./static-page-data-details.component.scss']
})
export class StaticPageDataDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StaticPageDataDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any) { }

  ngOnInit() {
  }
}
