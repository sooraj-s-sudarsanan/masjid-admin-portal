import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentCancelComponent } from './appoinment-cancel.component';

describe('AppoinmentCancelComponent', () => {
  let component: AppoinmentCancelComponent;
  let fixture: ComponentFixture<AppoinmentCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppoinmentCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppoinmentCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
