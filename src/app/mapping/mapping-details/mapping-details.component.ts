import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mapping-details',
  templateUrl: './mapping-details.component.html',
  styleUrls: ['./mapping-details.component.scss']
})
export class MappingDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MappingDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any
  ) { }

  ngOnInit(): void {
  }

}
