import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyRegisterGridActionComponent } from './family-register-grid-action.component';

describe('FamilyRegisterGridActionComponent', () => {
  let component: FamilyRegisterGridActionComponent;
  let fixture: ComponentFixture<FamilyRegisterGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyRegisterGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyRegisterGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
