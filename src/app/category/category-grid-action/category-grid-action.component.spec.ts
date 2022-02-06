import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryGridActionComponent } from './category-grid-action.component';

describe('CategoryGridActionComponent', () => {
  let component: CategoryGridActionComponent;
  let fixture: ComponentFixture<CategoryGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
