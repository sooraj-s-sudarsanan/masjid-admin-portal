import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagementDeleteComponent } from './role-management-delete.component';

describe('RoleManagementDeleteComponent', () => {
  let component: RoleManagementDeleteComponent;
  let fixture: ComponentFixture<RoleManagementDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleManagementDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleManagementDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
