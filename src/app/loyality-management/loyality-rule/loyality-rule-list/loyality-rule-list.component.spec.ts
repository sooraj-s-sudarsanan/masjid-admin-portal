import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyalityRuleListComponent } from './loyality-rule-list.component';

describe('LoyalityRuleListComponent', () => {
  let component: LoyalityRuleListComponent;
  let fixture: ComponentFixture<LoyalityRuleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyalityRuleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyalityRuleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
