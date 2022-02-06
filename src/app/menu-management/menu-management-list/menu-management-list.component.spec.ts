import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuManagementListComponent } from './menu-management-list.component';

describe('MenuManagementListComponent', () => {
  let component: MenuManagementListComponent;
  let fixture: ComponentFixture<MenuManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuManagementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
