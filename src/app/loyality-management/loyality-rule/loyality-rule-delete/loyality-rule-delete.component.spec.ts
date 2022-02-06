import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyalityRuleDeleteComponent } from './loyality-rule-delete.component';

describe('LoyalityRuleDeleteComponent', () => {
  let component: LoyalityRuleDeleteComponent;
  let fixture: ComponentFixture<LoyalityRuleDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyalityRuleDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyalityRuleDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
