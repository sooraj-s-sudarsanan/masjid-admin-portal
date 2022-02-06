import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferMappingListComponent } from './offer-mapping-list.component';

describe('OfferMappingListComponent', () => {
  let component: OfferMappingListComponent;
  let fixture: ComponentFixture<OfferMappingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferMappingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferMappingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
