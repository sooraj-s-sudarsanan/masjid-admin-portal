import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTypeDeleteComponent } from './report-type-delete.component';

describe('ReportTypeDeleteComponent', () => {
  let component: ReportTypeDeleteComponent;
  let fixture: ComponentFixture<ReportTypeDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTypeDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTypeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
