import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferTypeDeleteComponent } from './offer-type-delete.component';

describe('OfferTypeDeleteComponent', () => {
  let component: OfferTypeDeleteComponent;
  let fixture: ComponentFixture<OfferTypeDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferTypeDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferTypeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
