import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePersonGridActionComponent } from './service-person-grid-action.component';

describe('ServicePersonGridActionComponent', () => {
  let component: ServicePersonGridActionComponent;
  let fixture: ComponentFixture<ServicePersonGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePersonGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePersonGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
