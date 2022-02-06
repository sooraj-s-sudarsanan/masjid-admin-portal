import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDeleteComponent } from './offer-delete.component';

describe('OfferDeleteComponent', () => {
  let component: OfferDeleteComponent;
  let fixture: ComponentFixture<OfferDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
