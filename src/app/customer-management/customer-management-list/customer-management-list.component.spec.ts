import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerManagementListComponent } from './customer-management-list.component';

describe('CustomerManagementListComponent', () => {
  let component: CustomerManagementListComponent;
  let fixture: ComponentFixture<CustomerManagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerManagementListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
