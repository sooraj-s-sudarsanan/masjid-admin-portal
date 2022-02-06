import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyalityTypeListComponent } from './loyality-type-list.component';

describe('LoyalityTypeListComponent', () => {
  let component: LoyalityTypeListComponent;
  let fixture: ComponentFixture<LoyalityTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyalityTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyalityTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
