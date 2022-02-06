import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantDeleteComponent } from './merchant-delete.component';

describe('MerchantDeleteComponent', () => {
  let component: MerchantDeleteComponent;
  let fixture: ComponentFixture<MerchantDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
