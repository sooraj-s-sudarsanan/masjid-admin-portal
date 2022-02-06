import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersChangePasswordComponent } from './admin-users-change-password.component';

describe('AdminUsersChangePasswordComponent', () => {
  let component: AdminUsersChangePasswordComponent;
  let fixture: ComponentFixture<AdminUsersChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsersChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
