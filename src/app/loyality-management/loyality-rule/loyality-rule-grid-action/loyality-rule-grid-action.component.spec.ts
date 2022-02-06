import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyalityRuleGridActionComponent } from './loyality-rule-grid-action.component';

describe('LoyalityRuleGridActionComponent', () => {
  let component: LoyalityRuleGridActionComponent;
  let fixture: ComponentFixture<LoyalityRuleGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyalityRuleGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyalityRuleGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
