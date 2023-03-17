import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseRegisterDetailsComponent } from './house-register-details.component';

describe('HouseRegisterDetailsComponent', () => {
  let component: HouseRegisterDetailsComponent;
  let fixture: ComponentFixture<HouseRegisterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseRegisterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseRegisterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
