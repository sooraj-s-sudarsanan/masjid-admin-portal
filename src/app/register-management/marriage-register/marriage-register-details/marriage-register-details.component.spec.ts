import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageRegisterDetailsComponent } from './marriage-register-details.component';

describe('MarriageRegisterDetailsComponent', () => {
  let component: MarriageRegisterDetailsComponent;
  let fixture: ComponentFixture<MarriageRegisterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageRegisterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageRegisterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
