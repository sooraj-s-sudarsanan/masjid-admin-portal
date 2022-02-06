import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesGridActionComponent } from './features-grid-action.component';

describe('FeaturesGridActionComponent', () => {
  let component: FeaturesGridActionComponent;
  let fixture: ComponentFixture<FeaturesGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturesGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturesGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
