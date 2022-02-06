import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportConfigDeleteComponent } from './report-config-delete.component';

describe('ReportConfigDeleteComponent', () => {
  let component: ReportConfigDeleteComponent;
  let fixture: ComponentFixture<ReportConfigDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportConfigDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportConfigDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
