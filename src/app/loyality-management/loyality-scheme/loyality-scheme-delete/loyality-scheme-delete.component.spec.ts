import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyalitySchemeDeleteComponent } from './loyality-scheme-delete.component';

describe('LoyalitySchemeDeleteComponent', () => {
  let component: LoyalitySchemeDeleteComponent;
  let fixture: ComponentFixture<LoyalitySchemeDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyalitySchemeDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyalitySchemeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
