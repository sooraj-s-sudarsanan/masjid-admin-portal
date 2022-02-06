import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-features-details',
  templateUrl: './features-details.component.html',
  styleUrls: ['./features-details.component.scss']
})
export class FeaturesDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FeaturesDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any
  ) { }


  ngOnInit(): void {
  }

}
