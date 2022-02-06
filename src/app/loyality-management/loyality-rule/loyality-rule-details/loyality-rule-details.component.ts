import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-loyality-rule-details',
  templateUrl: './loyality-rule-details.component.html',
  styleUrls: ['./loyality-rule-details.component.scss']
})
export class LoyalityRuleDetailsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoyalityRuleDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any
  ) { }

  ngOnInit(): void {
  }

}
