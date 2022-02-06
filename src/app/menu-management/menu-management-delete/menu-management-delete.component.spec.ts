import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuManagementDeleteComponent } from './menu-management-delete.component';

describe('MenuManagementDeleteComponent', () => {
  let component: MenuManagementDeleteComponent;
  let fixture: ComponentFixture<MenuManagementDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuManagementDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuManagementDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
