import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferTypeGridActionComponent } from './offer-type-grid-action.component';

describe('OfferTypeGridActionComponent', () => {
  let component: OfferTypeGridActionComponent;
  let fixture: ComponentFixture<OfferTypeGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferTypeGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferTypeGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
