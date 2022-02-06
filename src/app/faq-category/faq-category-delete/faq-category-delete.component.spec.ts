import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqCategoryDeleteComponent } from './faq-category-delete.component';

describe('FaqCategoryDeleteComponent', () => {
  let component: FaqCategoryDeleteComponent;
  let fixture: ComponentFixture<FaqCategoryDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqCategoryDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqCategoryDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
