import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceModuleListComponent } from './service-module-list.component';

describe('ServiceModuleListComponent', () => {
  let component: ServiceModuleListComponent;
  let fixture: ComponentFixture<ServiceModuleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceModuleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceModuleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
