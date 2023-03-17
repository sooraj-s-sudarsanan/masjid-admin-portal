import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyRegisterDetailsComponent } from './family-register-details.component';

describe('FamilyRegisterDetailsComponent', () => {
  let component: FamilyRegisterDetailsComponent;
  let fixture: ComponentFixture<FamilyRegisterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyRegisterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyRegisterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
