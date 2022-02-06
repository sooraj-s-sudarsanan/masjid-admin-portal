import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagementDetailsComponent } from './role-management-details.component';

describe('RoleManagementDetailsComponent', () => {
  let component: RoleManagementDetailsComponent;
  let fixture: ComponentFixture<RoleManagementDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleManagementDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleManagementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
