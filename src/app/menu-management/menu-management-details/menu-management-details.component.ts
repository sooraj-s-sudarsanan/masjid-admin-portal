import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-menu-management-details',
  templateUrl: './menu-management-details.component.html',
  styleUrls: ['./menu-management-details.component.scss']
})
export class MenuManagementDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MenuManagementDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any
  ) { }

  ngOnInit(): void {
  }

}
