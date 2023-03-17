import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMasterListComponent } from './register-master-list.component';

describe('RegisterMasterListComponent', () => {
  let component: RegisterMasterListComponent;
  let fixture: ComponentFixture<RegisterMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
