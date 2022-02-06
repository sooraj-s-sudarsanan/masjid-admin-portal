import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersManagementGridActionComponent } from './admin-users-management-grid-action.component';

describe('AdminUsersManagementGridActionComponent', () => {
  let component: AdminUsersManagementGridActionComponent;
  let fixture: ComponentFixture<AdminUsersManagementGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsersManagementGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersManagementGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
