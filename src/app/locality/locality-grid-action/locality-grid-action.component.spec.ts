import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalityGridActionComponent } from './locality-grid-action.component';

describe('LocalityGridActionComponent', () => {
  let component: LocalityGridActionComponent;
  let fixture: ComponentFixture<LocalityGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalityGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalityGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
