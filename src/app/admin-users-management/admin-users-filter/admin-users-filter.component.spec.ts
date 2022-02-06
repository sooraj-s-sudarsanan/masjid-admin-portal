import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersFilterComponent } from './admin-users-filter.component';

describe('AdminUsersFilterComponent', () => {
  let component: AdminUsersFilterComponent;
  let fixture: ComponentFixture<AdminUsersFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsersFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
