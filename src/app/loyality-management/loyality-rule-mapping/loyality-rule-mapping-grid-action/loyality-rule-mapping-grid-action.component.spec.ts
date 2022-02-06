import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyalityRuleMappingGridActionComponent } from './loyality-rule-mapping-grid-action.component';

describe('LoyalityRuleMappingGridActionComponent', () => {
  let component: LoyalityRuleMappingGridActionComponent;
  let fixture: ComponentFixture<LoyalityRuleMappingGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyalityRuleMappingGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyalityRuleMappingGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
