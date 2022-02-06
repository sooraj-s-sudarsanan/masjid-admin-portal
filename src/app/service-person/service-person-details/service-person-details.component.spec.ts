import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePersonDetailsComponent } from './service-person-details.component';

describe('ServicePersonDetailsComponent', () => {
  let component: ServicePersonDetailsComponent;
  let fixture: ComponentFixture<ServicePersonDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePersonDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePersonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
