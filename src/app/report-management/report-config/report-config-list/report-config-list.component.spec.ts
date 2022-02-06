import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportConfigListComponent } from './report-config-list.component';

describe('ReportConfigListComponent', () => {
  let component: ReportConfigListComponent;
  let fixture: ComponentFixture<ReportConfigListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportConfigListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportConfigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
