import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivorceRegisterGridActionComponent } from './divorce-register-grid-action.component';

describe('DivorceRegisterGridActionComponent', () => {
  let component: DivorceRegisterGridActionComponent;
  let fixture: ComponentFixture<DivorceRegisterGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivorceRegisterGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivorceRegisterGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
