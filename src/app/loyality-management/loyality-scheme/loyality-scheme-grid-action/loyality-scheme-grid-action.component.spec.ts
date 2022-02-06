import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyalitySchemeGridActionComponent } from './loyality-scheme-grid-action.component';

describe('LoyalitySchemeGridActionComponent', () => {
  let component: LoyalitySchemeGridActionComponent;
  let fixture: ComponentFixture<LoyalitySchemeGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyalitySchemeGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyalitySchemeGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
