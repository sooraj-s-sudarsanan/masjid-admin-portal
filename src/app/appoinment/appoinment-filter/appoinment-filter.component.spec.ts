import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentFilterComponent } from './appoinment-filter.component';

describe('AppoinmentFilterComponent', () => {
  let component: AppoinmentFilterComponent;
  let fixture: ComponentFixture<AppoinmentFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppoinmentFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppoinmentFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
