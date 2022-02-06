import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqCategoryListComponent } from './faq-category-list.component';

describe('FaqCategoryListComponent', () => {
  let component: FaqCategoryListComponent;
  let fixture: ComponentFixture<FaqCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
