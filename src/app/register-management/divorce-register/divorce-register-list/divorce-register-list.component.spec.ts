import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivorceRegisterListComponent } from './divorce-register-list.component';

describe('DivorceRegisterListComponent', () => {
  let component: DivorceRegisterListComponent;
  let fixture: ComponentFixture<DivorceRegisterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivorceRegisterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivorceRegisterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
