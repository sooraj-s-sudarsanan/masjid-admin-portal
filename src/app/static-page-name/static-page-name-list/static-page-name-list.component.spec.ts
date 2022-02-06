import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticPageNameListComponent } from './static-page-name-list.component';

describe('StaticPageNameListComponent', () => {
  let component: StaticPageNameListComponent;
  let fixture: ComponentFixture<StaticPageNameListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticPageNameListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticPageNameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
