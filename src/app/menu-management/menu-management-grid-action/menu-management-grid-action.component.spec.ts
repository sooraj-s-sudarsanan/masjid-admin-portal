import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuManagementGridActionComponent } from './menu-management-grid-action.component';

describe('MenuManagementGridActionComponent', () => {
  let component: MenuManagementGridActionComponent;
  let fixture: ComponentFixture<MenuManagementGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuManagementGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuManagementGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
