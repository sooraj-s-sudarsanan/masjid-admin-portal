import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMasterDetailsComponent } from './register-master-details.component';

describe('RegisterMasterDetailsComponent', () => {
  let component: RegisterMasterDetailsComponent;
  let fixture: ComponentFixture<RegisterMasterDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterMasterDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterMasterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
