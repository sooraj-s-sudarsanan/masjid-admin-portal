import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceModuleDeleteComponent } from './service-module-delete.component';

describe('ServiceModuleDeleteComponent', () => {
  let component: ServiceModuleDeleteComponent;
  let fixture: ComponentFixture<ServiceModuleDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceModuleDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceModuleDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
