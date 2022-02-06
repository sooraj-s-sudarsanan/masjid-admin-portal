import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxServiceMappingFilterComponent } from './tax-service-mapping-filter.component';

describe('TaxServiceMappingFilterComponent', () => {
  let component: TaxServiceMappingFilterComponent;
  let fixture: ComponentFixture<TaxServiceMappingFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxServiceMappingFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxServiceMappingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
