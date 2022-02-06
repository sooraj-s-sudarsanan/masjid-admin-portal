import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticPageNameDeleteComponent } from './static-page-name-delete.component';

describe('StaticPageNameDeleteComponent', () => {
  let component: StaticPageNameDeleteComponent;
  let fixture: ComponentFixture<StaticPageNameDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticPageNameDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticPageNameDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
