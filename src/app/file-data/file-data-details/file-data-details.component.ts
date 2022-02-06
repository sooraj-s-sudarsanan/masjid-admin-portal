import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleService } from 'src/app/core/services/role.service';

@Component({
  selector: 'app-file-data-details',
  templateUrl: './file-data-details.component.html',
  styleUrls: ['./file-data-details.component.scss']
})
export class FileDataDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FileDataDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public roleService: RoleService
  ) { }

  ngOnInit() {
  }

}
