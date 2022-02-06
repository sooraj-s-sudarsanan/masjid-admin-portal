import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAppDetailsGridActionComponent } from './manage-app-details-grid-action.component';

describe('ManageAppDetailsGridActionComponent', () => {
  let component: ManageAppDetailsGridActionComponent;
  let fixture: ComponentFixture<ManageAppDetailsGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAppDetailsGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAppDetailsGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
