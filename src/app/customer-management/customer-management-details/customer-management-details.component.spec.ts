import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerManagementDetailsComponent } from './customer-management-details.component';

describe('CustomerManagementDetailsComponent', () => {
  let component: CustomerManagementDetailsComponent;
  let fixture: ComponentFixture<CustomerManagementDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerManagementDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerManagementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
