import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.scss']
})
export class BranchDetailsComponent implements OnInit {
  branchbreakTime = null;
  constructor(
    public dialogRef: MatDialogRef<BranchDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any
  ) { }

  ngOnInit(): void {
    if (this.row) {
      if (this.row.data) {
        if (this.row.data.branchbreakTime) {
          this.branchbreakTime = JSON.parse(this.row.data.branchbreakTime);
        }
      }
    }
  }

}
