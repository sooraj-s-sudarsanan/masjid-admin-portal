import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxServiceMappingDeleteComponent } from './tax-service-mapping-delete.component';

describe('TaxServiceMappingDeleteComponent', () => {
  let component: TaxServiceMappingDeleteComponent;
  let fixture: ComponentFixture<TaxServiceMappingDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxServiceMappingDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxServiceMappingDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
