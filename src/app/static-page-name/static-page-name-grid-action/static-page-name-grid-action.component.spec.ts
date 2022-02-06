import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticPageNameGridActionComponent } from './static-page-name-grid-action.component';

describe('StaticPageNameGridActionComponent', () => {
  let component: StaticPageNameGridActionComponent;
  let fixture: ComponentFixture<StaticPageNameGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticPageNameGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticPageNameGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
