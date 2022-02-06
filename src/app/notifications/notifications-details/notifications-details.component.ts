import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleService } from 'src/app/core/services/role.service';

@Component({
  selector: 'app-notifications-details',
  templateUrl: './notifications-details.component.html',
  styleUrls: ['./notifications-details.component.scss']
})
export class NotificationsDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NotificationsDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public roleService: RoleService
  ) { }

  ngOnInit() {
  }

}
