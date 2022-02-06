import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentAddonsComponent } from './appoinment-addons.component';

describe('AppoinmentAddonsComponent', () => {
  let component: AppoinmentAddonsComponent;
  let fixture: ComponentFixture<AppoinmentAddonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppoinmentAddonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppoinmentAddonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
