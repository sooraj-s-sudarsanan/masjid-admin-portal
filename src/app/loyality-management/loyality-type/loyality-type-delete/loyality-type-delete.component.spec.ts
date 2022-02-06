import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyalityTypeDeleteComponent } from './loyality-type-delete.component';

describe('LoyalityTypeDeleteComponent', () => {
  let component: LoyalityTypeDeleteComponent;
  let fixture: ComponentFixture<LoyalityTypeDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyalityTypeDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyalityTypeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
