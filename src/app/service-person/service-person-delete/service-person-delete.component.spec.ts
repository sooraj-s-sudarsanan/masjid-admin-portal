import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePersonDeleteComponent } from './service-person-delete.component';

describe('ServicePersonDeleteComponent', () => {
  let component: ServicePersonDeleteComponent;
  let fixture: ComponentFixture<ServicePersonDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePersonDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePersonDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
