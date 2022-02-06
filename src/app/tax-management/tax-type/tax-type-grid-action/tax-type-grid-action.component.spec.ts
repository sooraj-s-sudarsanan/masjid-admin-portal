import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxTypeGridActionComponent } from './tax-type-grid-action.component';

describe('TaxTypeGridActionComponent', () => {
  let component: TaxTypeGridActionComponent;
  let fixture: ComponentFixture<TaxTypeGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxTypeGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxTypeGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
