import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferMappingDeleteComponent } from './offer-mapping-delete.component';

describe('OfferMappingDeleteComponent', () => {
  let component: OfferMappingDeleteComponent;
  let fixture: ComponentFixture<OfferMappingDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferMappingDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferMappingDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
