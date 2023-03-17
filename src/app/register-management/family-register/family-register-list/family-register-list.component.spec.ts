import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyRegisterListComponent } from './family-register-list.component';

describe('FamilyRegisterListComponent', () => {
  let component: FamilyRegisterListComponent;
  let fixture: ComponentFixture<FamilyRegisterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyRegisterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyRegisterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
