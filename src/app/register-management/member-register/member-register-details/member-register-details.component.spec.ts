import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRegisterDetailsComponent } from './member-register-details.component';

describe('MemberRegisterDetailsComponent', () => {
  let component: MemberRegisterDetailsComponent;
  let fixture: ComponentFixture<MemberRegisterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberRegisterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberRegisterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
