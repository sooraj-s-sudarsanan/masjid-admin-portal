import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePersonListComponent } from './service-person-list.component';

describe('ServicePersonListComponent', () => {
  let component: ServicePersonListComponent;
  let fixture: ComponentFixture<ServicePersonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePersonListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePersonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
