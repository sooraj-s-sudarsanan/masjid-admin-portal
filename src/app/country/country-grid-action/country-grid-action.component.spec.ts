import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryGridActionComponent } from './country-grid-action.component';

describe('CountryGridActionComponent', () => {
  let component: CountryGridActionComponent;
  let fixture: ComponentFixture<CountryGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
