import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantGridActionComponent } from './merchant-grid-action.component';

describe('MerchantGridActionComponent', () => {
  let component: MerchantGridActionComponent;
  let fixture: ComponentFixture<MerchantGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
