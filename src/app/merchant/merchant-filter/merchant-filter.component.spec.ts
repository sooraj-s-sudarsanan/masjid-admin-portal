import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantFilterComponent } from './merchant-filter.component';

describe('MerchantFilterComponent', () => {
  let component: MerchantFilterComponent;
  let fixture: ComponentFixture<MerchantFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
