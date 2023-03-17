import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRegisterListComponent } from './member-register-list.component';

describe('MemberRegisterListComponent', () => {
  let component: MemberRegisterListComponent;
  let fixture: ComponentFixture<MemberRegisterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberRegisterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberRegisterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
