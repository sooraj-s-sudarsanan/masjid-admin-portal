import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxComponentsGridActionComponent } from './tax-components-grid-action.component';

describe('TaxComponentsGridActionComponent', () => {
  let component: TaxComponentsGridActionComponent;
  let fixture: ComponentFixture<TaxComponentsGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxComponentsGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxComponentsGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
