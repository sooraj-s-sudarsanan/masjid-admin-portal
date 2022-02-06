import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyalityRuleDetailsComponent } from './loyality-rule-details.component';

describe('LoyalityRuleDetailsComponent', () => {
  let component: LoyalityRuleDetailsComponent;
  let fixture: ComponentFixture<LoyalityRuleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyalityRuleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyalityRuleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
