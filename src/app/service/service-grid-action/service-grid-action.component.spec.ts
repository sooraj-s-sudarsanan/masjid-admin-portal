import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceGridActionComponent } from './service-grid-action.component';

describe('ServiceGridActionComponent', () => {
  let component: ServiceGridActionComponent;
  let fixture: ComponentFixture<ServiceGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
