import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportConfigFilterComponent } from './report-config-filter.component';

describe('ReportConfigFilterComponent', () => {
  let component: ReportConfigFilterComponent;
  let fixture: ComponentFixture<ReportConfigFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportConfigFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportConfigFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
