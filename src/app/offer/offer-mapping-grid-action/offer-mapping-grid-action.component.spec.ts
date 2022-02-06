import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferMappingGridActionComponent } from './offer-mapping-grid-action.component';

describe('OfferMappingGridActionComponent', () => {
  let component: OfferMappingGridActionComponent;
  let fixture: ComponentFixture<OfferMappingGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferMappingGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferMappingGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
