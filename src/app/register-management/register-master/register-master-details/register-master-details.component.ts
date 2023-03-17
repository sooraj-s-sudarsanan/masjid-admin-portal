import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-register-master-details',
  templateUrl: './register-master-details.component.html',
  styleUrls: ['./register-master-details.component.scss']
})
export class RegisterMasterDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RegisterMasterDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any
  ) { }

  ngOnInit(): void {
  }

}
