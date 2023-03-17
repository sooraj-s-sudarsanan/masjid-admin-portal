import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseRegisterDeleteComponent } from './house-register-delete.component';

describe('HouseRegisterDeleteComponent', () => {
  let component: HouseRegisterDeleteComponent;
  let fixture: ComponentFixture<HouseRegisterDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseRegisterDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseRegisterDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
