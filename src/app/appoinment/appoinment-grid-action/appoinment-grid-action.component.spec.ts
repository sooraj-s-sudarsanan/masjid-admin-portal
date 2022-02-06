import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentGridActionComponent } from './appoinment-grid-action.component';

describe('AppoinmentGridActionComponent', () => {
  let component: AppoinmentGridActionComponent;
  let fixture: ComponentFixture<AppoinmentGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppoinmentGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppoinmentGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
