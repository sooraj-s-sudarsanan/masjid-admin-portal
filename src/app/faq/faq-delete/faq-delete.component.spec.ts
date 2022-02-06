import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqDeleteComponent } from './faq-delete.component';

describe('FaqDeleteComponent', () => {
  let component: FaqDeleteComponent;
  let fixture: ComponentFixture<FaqDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
