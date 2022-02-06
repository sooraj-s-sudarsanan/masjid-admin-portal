import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTypeGridActionComponent } from './report-type-grid-action.component';

describe('ReportTypeGridActionComponent', () => {
  let component: ReportTypeGridActionComponent;
  let fixture: ComponentFixture<ReportTypeGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTypeGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTypeGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
