import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticPageDataGridActionComponent } from './static-page-data-grid-action.component';

describe('StaticPageDataGridActionComponent', () => {
  let component: StaticPageDataGridActionComponent;
  let fixture: ComponentFixture<StaticPageDataGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticPageDataGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticPageDataGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
