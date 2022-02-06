import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermAndConditionModalComponent } from './term-and-condition-modal.component';

describe('TermAndConditionModalComponent', () => {
  let component: TermAndConditionModalComponent;
  let fixture: ComponentFixture<TermAndConditionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermAndConditionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermAndConditionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
