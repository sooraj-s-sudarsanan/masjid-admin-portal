import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageRegisterDeleteComponent } from './marriage-register-delete.component';

describe('MarriageRegisterDeleteComponent', () => {
  let component: MarriageRegisterDeleteComponent;
  let fixture: ComponentFixture<MarriageRegisterDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarriageRegisterDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarriageRegisterDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
