import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeGridActionComponent } from './employee-grid-action.component';

describe('EmployeeGridActionComponent', () => {
  let component: EmployeeGridActionComponent;
  let fixture: ComponentFixture<EmployeeGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
