import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticPageNameDetailsComponent } from './static-page-name-details.component';

describe('StaticPageNameDetailsComponent', () => {
  let component: StaticPageNameDetailsComponent;
  let fixture: ComponentFixture<StaticPageNameDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticPageNameDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticPageNameDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
