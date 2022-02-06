import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleUpdatePermissionComponent } from './role-update-permission.component';

describe('RoleUpdatePermissionComponent', () => {
  let component: RoleUpdatePermissionComponent;
  let fixture: ComponentFixture<RoleUpdatePermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleUpdatePermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleUpdatePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
