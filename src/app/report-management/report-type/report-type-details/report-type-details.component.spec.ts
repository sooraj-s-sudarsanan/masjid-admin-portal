import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTypeDetailsComponent } from './report-type-details.component';

describe('ReportTypeDetailsComponent', () => {
  let component: ReportTypeDetailsComponent;
  let fixture: ComponentFixture<ReportTypeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTypeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
