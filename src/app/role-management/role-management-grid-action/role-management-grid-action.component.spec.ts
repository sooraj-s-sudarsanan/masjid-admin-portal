import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleManagementGridActionComponent } from './role-management-grid-action.component';

describe('RoleManagementGridActionComponent', () => {
  let component: RoleManagementGridActionComponent;
  let fixture: ComponentFixture<RoleManagementGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleManagementGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleManagementGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
