import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-divorce-register-details',
  templateUrl: './divorce-register-details.component.html',
  styleUrls: ['./divorce-register-details.component.scss']
})
export class DivorceRegisterDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DivorceRegisterDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any
  ) { }

  ngOnInit(): void {
  }
  

}
