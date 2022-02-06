import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersManagementDeleteComponent } from './admin-users-management-delete.component';

describe('AdminUsersManagementDeleteComponent', () => {
  let component: AdminUsersManagementDeleteComponent;
  let fixture: ComponentFixture<AdminUsersManagementDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsersManagementDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersManagementDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
