import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticPageDataDetailsComponent } from './static-page-data-details.component';

describe('StaticPageDataDetailsComponent', () => {
  let component: StaticPageDataDetailsComponent;
  let fixture: ComponentFixture<StaticPageDataDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticPageDataDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticPageDataDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
