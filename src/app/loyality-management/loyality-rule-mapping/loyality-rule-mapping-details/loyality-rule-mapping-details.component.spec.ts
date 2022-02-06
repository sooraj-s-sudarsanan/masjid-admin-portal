import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyalityRuleMappingDetailsComponent } from './loyality-rule-mapping-details.component';

describe('LoyalityRuleMappingDetailsComponent', () => {
  let component: LoyalityRuleMappingDetailsComponent;
  let fixture: ComponentFixture<LoyalityRuleMappingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyalityRuleMappingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyalityRuleMappingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
