import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyalityRuleMappingListComponent } from './loyality-rule-mapping-list.component';

describe('LoyalityRuleMappingListComponent', () => {
  let component: LoyalityRuleMappingListComponent;
  let fixture: ComponentFixture<LoyalityRuleMappingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyalityRuleMappingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyalityRuleMappingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
