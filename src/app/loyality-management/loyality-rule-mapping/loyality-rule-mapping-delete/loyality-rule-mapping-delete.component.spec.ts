import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyalityRuleMappingDeleteComponent } from './loyality-rule-mapping-delete.component';

describe('LoyalityRuleMappingDeleteComponent', () => {
  let component: LoyalityRuleMappingDeleteComponent;
  let fixture: ComponentFixture<LoyalityRuleMappingDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyalityRuleMappingDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyalityRuleMappingDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
