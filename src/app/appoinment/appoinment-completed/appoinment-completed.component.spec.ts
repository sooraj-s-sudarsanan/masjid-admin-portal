import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentCompletedComponent } from './appoinment-completed.component';

describe('AppoinmentCompletedComponent', () => {
  let component: AppoinmentCompletedComponent;
  let fixture: ComponentFixture<AppoinmentCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppoinmentCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppoinmentCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
