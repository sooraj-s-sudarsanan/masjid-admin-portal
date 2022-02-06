import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceModuleDetailsComponent } from './service-module-details.component';

describe('ServiceModuleDetailsComponent', () => {
  let component: ServiceModuleDetailsComponent;
  let fixture: ComponentFixture<ServiceModuleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceModuleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceModuleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
