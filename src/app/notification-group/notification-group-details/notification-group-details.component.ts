import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-notification-group-details',
  templateUrl: './notification-group-details.component.html',
  styleUrls: ['./notification-group-details.component.scss']
})
export class NotificationGroupDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NotificationGroupDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any
  ) { }

  ngOnInit() {
  }

}
