import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseRegisterGridActionComponent } from './house-register-grid-action.component';

describe('HouseRegisterGridActionComponent', () => {
  let component: HouseRegisterGridActionComponent;
  let fixture: ComponentFixture<HouseRegisterGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseRegisterGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseRegisterGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
