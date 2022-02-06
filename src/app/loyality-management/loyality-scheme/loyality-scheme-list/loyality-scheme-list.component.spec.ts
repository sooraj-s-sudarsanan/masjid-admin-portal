import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyalitySchemeListComponent } from './loyality-scheme-list.component';

describe('LoyalitySchemeListComponent', () => {
  let component: LoyalitySchemeListComponent;
  let fixture: ComponentFixture<LoyalitySchemeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyalitySchemeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyalitySchemeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
