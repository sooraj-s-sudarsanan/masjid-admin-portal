import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxServiceMappingGridActionComponent } from './tax-service-mapping-grid-action.component';

describe('TaxServiceMappingGridActionComponent', () => {
  let component: TaxServiceMappingGridActionComponent;
  let fixture: ComponentFixture<TaxServiceMappingGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxServiceMappingGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxServiceMappingGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
