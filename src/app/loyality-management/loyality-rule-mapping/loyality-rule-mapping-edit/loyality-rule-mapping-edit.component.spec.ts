import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyalityRuleMappingEditComponent } from './loyality-rule-mapping-edit.component';

describe('LoyalityRuleMappingEditComponent', () => {
  let component: LoyalityRuleMappingEditComponent;
  let fixture: ComponentFixture<LoyalityRuleMappingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyalityRuleMappingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyalityRuleMappingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
