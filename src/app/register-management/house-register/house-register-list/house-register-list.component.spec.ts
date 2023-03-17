import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseRegisterListComponent } from './house-register-list.component';

describe('HouseRegisterListComponent', () => {
  let component: HouseRegisterListComponent;
  let fixture: ComponentFixture<HouseRegisterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseRegisterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseRegisterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
