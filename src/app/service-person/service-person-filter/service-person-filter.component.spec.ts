import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePersonFilterComponent } from './service-person-filter.component';

describe('ServicePersonFilterComponent', () => {
  let component: ServicePersonFilterComponent;
  let fixture: ComponentFixture<ServicePersonFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePersonFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePersonFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
