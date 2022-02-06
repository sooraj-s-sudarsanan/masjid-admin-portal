import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticPageDataDeleteComponent } from './static-page-data-delete.component';

describe('StaticPageDataDeleteComponent', () => {
  let component: StaticPageDataDeleteComponent;
  let fixture: ComponentFixture<StaticPageDataDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticPageDataDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticPageDataDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
