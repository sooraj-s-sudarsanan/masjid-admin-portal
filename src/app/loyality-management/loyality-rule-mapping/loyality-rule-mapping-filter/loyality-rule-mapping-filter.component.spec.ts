import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyalityRuleMappingFilterComponent } from './loyality-rule-mapping-filter.component';

describe('LoyalityRuleMappingFilterComponent', () => {
  let component: LoyalityRuleMappingFilterComponent;
  let fixture: ComponentFixture<LoyalityRuleMappingFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyalityRuleMappingFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyalityRuleMappingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
