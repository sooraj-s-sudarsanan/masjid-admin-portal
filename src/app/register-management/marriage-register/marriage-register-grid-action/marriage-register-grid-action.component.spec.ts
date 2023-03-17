import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageRegisterGridActionComponent } from './marriage-register-grid-action.component';

describe('MarriageRegisterGridActionComponent', () => {
  let component: MarriageRegisterGridActionComponent;
  let fixture: ComponentFixture<MarriageRegisterGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageRegisterGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageRegisterGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
