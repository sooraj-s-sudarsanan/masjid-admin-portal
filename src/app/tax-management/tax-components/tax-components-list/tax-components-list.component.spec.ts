import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxComponentsListComponent } from './tax-components-list.component';

describe('TaxComponentsListComponent', () => {
  let component: TaxComponentsListComponent;
  let fixture: ComponentFixture<TaxComponentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxComponentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxComponentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
