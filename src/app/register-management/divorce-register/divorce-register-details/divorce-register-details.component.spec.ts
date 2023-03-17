import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivorceRegisterDetailsComponent } from './divorce-register-details.component';

describe('DivorceRegisterDetailsComponent', () => {
  let component: DivorceRegisterDetailsComponent;
  let fixture: ComponentFixture<DivorceRegisterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivorceRegisterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivorceRegisterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
