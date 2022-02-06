import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesDeleteComponent } from './features-delete.component';

describe('FeaturesDeleteComponent', () => {
  let component: FeaturesDeleteComponent;
  let fixture: ComponentFixture<FeaturesDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturesDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
