import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeblinkComponent } from './weblink.component';

describe('WeblinkComponent', () => {
  let component: WeblinkComponent;
  let fixture: ComponentFixture<WeblinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeblinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeblinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
