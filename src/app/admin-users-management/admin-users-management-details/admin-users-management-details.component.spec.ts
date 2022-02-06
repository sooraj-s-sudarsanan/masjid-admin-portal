import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersManagementDetailsComponent } from './admin-users-management-details.component';

describe('AdminUsersManagementDetailsComponent', () => {
  let component: AdminUsersManagementDetailsComponent;
  let fixture: ComponentFixture<AdminUsersManagementDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsersManagementDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersManagementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
