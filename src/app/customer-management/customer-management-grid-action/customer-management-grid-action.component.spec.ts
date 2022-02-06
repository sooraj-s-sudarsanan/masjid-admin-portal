import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerManagementGridActionComponent } from './customer-management-grid-action.component';

describe('CustomerManagementGridActionComponent', () => {
  let component: CustomerManagementGridActionComponent;
  let fixture: ComponentFixture<CustomerManagementGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerManagementGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerManagementGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
