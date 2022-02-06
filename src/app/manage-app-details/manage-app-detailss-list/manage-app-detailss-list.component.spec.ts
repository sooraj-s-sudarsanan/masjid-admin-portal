import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAppDetailssListComponent } from './manage-app-detailss-list.component';

describe('ManageAppDetailssListComponent', () => {
  let component: ManageAppDetailssListComponent;
  let fixture: ComponentFixture<ManageAppDetailssListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAppDetailssListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAppDetailssListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
