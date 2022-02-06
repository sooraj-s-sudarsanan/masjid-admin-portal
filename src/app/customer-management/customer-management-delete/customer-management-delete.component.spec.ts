import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerManagementDeleteComponent } from './customer-management-delete.component';

describe('CustomerManagementDeleteComponent', () => {
  let component: CustomerManagementDeleteComponent;
  let fixture: ComponentFixture<CustomerManagementDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerManagementDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerManagementDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
