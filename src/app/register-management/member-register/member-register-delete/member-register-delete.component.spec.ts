import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRegisterDeleteComponent } from './member-register-delete.component';

describe('MemberRegisterDeleteComponent', () => {
  let component: MemberRegisterDeleteComponent;
  let fixture: ComponentFixture<MemberRegisterDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberRegisterDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberRegisterDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
