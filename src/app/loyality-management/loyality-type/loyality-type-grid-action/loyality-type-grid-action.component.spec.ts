import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyalityTypeGridActionComponent } from './loyality-type-grid-action.component';

describe('LoyalityTypeGridActionComponent', () => {
  let component: LoyalityTypeGridActionComponent;
  let fixture: ComponentFixture<LoyalityTypeGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyalityTypeGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyalityTypeGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
