import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportConfigGridActionComponent } from './report-config-grid-action.component';

describe('ReportConfigGridActionComponent', () => {
  let component: ReportConfigGridActionComponent;
  let fixture: ComponentFixture<ReportConfigGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportConfigGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportConfigGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
