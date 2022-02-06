import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqCategoryGridActionComponent } from './faq-category-grid-action.component';

describe('FaqCategoryGridActionComponent', () => {
  let component: FaqCategoryGridActionComponent;
  let fixture: ComponentFixture<FaqCategoryGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqCategoryGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqCategoryGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
