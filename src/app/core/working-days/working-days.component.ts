import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { from } from 'rxjs';
import { WorkingDaysModel } from 'src/app/core/model/working-days-model';
@Component({
  selector: 'app-working-days',
  templateUrl: './working-days.component.html',
  styleUrls: ['./working-days.component.scss']
})
export class WorkingDaysComponent implements OnInit, OnChanges {

  @Input() placeholder = 'Please choose';
  @Input() inValue = null;
  @Input() inDisabled = null;
  @Input() inRequired = false;
  disabled = null;
  // tslint:disable-next-line: no-output-native
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
  workingDays = WorkingDaysModel.days;

  ngOnInit(): void {

  }

  DaysOnChange(event): void {
    this.change.emit(event.value);
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.inDisabled) {
      this.disabled = changes.inDisabled.currentValue;
    }
    if (changes.inValue) {
      this.inValue = changes.inValue.currentValue;
    }
  }
}
