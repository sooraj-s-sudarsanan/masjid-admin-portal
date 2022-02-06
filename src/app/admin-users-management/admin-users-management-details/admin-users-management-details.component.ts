import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-users-management-details',
  templateUrl: './admin-users-management-details.component.html',
  styleUrls: ['./admin-users-management-details.component.scss']
})
export class AdminUsersManagementDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AdminUsersManagementDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any
  ) { }


  ngOnInit(): void {
  }

}
