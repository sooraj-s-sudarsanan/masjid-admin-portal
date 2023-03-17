import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMasterGridActionComponent } from './register-master-grid-action.component';

describe('RegisterMasterGridActionComponent', () => {
  let component: RegisterMasterGridActionComponent;
  let fixture: ComponentFixture<RegisterMasterGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterMasterGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterMasterGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
