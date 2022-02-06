import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportConfigDetailsComponent } from './report-config-details.component';

describe('ReportConfigDetailsComponent', () => {
  let component: ReportConfigDetailsComponent;
  let fixture: ComponentFixture<ReportConfigDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportConfigDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportConfigDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
