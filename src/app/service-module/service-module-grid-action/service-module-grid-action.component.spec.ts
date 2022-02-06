import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceModuleGridActionComponent } from './service-module-grid-action.component';

describe('ServiceModuleGridActionComponent', () => {
  let component: ServiceModuleGridActionComponent;
  let fixture: ComponentFixture<ServiceModuleGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceModuleGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceModuleGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
