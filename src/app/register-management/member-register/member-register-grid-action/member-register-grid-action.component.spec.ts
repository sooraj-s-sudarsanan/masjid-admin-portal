import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRegisterGridActionComponent } from './member-register-grid-action.component';

describe('MemberRegisterGridActionComponent', () => {
  let component: MemberRegisterGridActionComponent;
  let fixture: ComponentFixture<MemberRegisterGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberRegisterGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberRegisterGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
