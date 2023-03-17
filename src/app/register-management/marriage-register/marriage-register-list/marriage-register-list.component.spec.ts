import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageRegisterListComponent } from './marriage-register-list.component';

describe('MarriageRegisterListComponent', () => {
  let component: MarriageRegisterListComponent;
  let fixture: ComponentFixture<MarriageRegisterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageRegisterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageRegisterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
