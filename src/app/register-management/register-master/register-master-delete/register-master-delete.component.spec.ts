import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMasterDeleteComponent } from './register-master-delete.component';

describe('RegisterMasterDeleteComponent', () => {
  let component: RegisterMasterDeleteComponent;
  let fixture: ComponentFixture<RegisterMasterDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterMasterDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterMasterDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
