import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-member-register-details',
  templateUrl: './member-register-details.component.html',
  styleUrls: ['./member-register-details.component.scss']
})
export class MemberRegisterDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MemberRegisterDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any
  ) { }

  ngOnInit(): void {
  }

}
