import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleKeyModel } from 'src/app/core/model/module-key-model';

@Component({
  selector: 'app-service-person-details',
  templateUrl: './service-person-details.component.html',
  styleUrls: ['./service-person-details.component.scss']
})
export class ServicePersonDetailsComponent implements OnInit {

  columns = [];
  serPersonList = [];

  constructor(
    public dialogRef: MatDialogRef<ServicePersonDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.columns = [
      { name: 'Name', prop: 'servicePersonName' },
      { name: 'sBooking Allowed', prop: 'servicePersonBookingAllowed' },
      { name: 'Avg Duration', prop: 'servicePersonAvgDuration' },
      { name: 'Start Time', prop: 'servicePersonStartTime' },
      { name: 'End Time', prop: 'servicePersonEndTime' }
    ];
    if (this.row && this.row.data  && this.row.data.servicePerson) {
      this.serPersonList = this.row.data.servicePerson;
    }
  }
  get moduleKeyModel(): any {
    return ModuleKeyModel;
  }
  ngAfterViewChecked():void{
    window.dispatchEvent(new Event('resize'));
}
}
