import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalityDeleteComponent } from './locality-delete.component';

describe('LocalityDeleteComponent', () => {
  let component: LocalityDeleteComponent;
  let fixture: ComponentFixture<LocalityDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalityDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalityDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
