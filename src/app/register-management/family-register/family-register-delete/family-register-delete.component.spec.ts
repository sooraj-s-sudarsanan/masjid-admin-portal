import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyRegisterDeleteComponent } from './family-register-delete.component';

describe('FamilyRegisterDeleteComponent', () => {
  let component: FamilyRegisterDeleteComponent;
  let fixture: ComponentFixture<FamilyRegisterDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyRegisterDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyRegisterDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
