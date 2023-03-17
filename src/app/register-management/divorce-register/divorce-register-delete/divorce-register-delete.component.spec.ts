import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivorceRegisterDeleteComponent } from './divorce-register-delete.component';

describe('DivorceRegisterDeleteComponent', () => {
  let component: DivorceRegisterDeleteComponent;
  let fixture: ComponentFixture<DivorceRegisterDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivorceRegisterDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivorceRegisterDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
