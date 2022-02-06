import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersManagementListComponent } from './admin-users-management-list.component';

describe('AdminUsersManagementListComponent', () => {
  let component: AdminUsersManagementListComponent;
  let fixture: ComponentFixture<AdminUsersManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsersManagementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
