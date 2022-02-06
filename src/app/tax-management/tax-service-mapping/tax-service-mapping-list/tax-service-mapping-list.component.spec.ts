import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxServiceMappingListComponent } from './tax-service-mapping-list.component';

describe('TaxServiceMappingListComponent', () => {
  let component: TaxServiceMappingListComponent;
  let fixture: ComponentFixture<TaxServiceMappingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxServiceMappingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxServiceMappingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
