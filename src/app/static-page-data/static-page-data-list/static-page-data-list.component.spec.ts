import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticPageDataListComponent } from './static-page-data-list.component';

describe('StaticPageDataListComponent', () => {
  let component: StaticPageDataListComponent;
  let fixture: ComponentFixture<StaticPageDataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticPageDataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticPageDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
