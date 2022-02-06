import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxTypeDeleteComponent } from './tax-type-delete.component';

describe('TaxTypeDeleteComponent', () => {
  let component: TaxTypeDeleteComponent;
  let fixture: ComponentFixture<TaxTypeDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxTypeDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxTypeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
