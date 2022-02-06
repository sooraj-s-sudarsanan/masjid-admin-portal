import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuManagementDetailsComponent } from './menu-management-details.component';

describe('MenuManagementDetailsComponent', () => {
  let component: MenuManagementDetailsComponent;
  let fixture: ComponentFixture<MenuManagementDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuManagementDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuManagementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
