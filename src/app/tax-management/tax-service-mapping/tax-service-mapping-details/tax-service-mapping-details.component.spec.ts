import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxServiceMappingDetailsComponent } from './tax-service-mapping-details.component';

describe('TaxServiceMappingDetailsComponent', () => {
  let component: TaxServiceMappingDetailsComponent;
  let fixture: ComponentFixture<TaxServiceMappingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxServiceMappingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxServiceMappingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
