import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqGridActionComponent } from './faq-grid-action.component';

describe('FaqGridActionComponent', () => {
  let component: FaqGridActionComponent;
  let fixture: ComponentFixture<FaqGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
