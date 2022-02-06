import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxComponentsDeleteComponent } from './tax-components-delete.component';

describe('TaxComponentsDeleteComponent', () => {
  let component: TaxComponentsDeleteComponent;
  let fixture: ComponentFixture<TaxComponentsDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxComponentsDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxComponentsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
