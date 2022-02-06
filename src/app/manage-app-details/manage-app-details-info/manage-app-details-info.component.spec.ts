import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAppDetailsInfoComponent } from './manage-app-details-info.component';

describe('ManageAppDetailsInfoComponent', () => {
  let component: ManageAppDetailsInfoComponent;
  let fixture: ComponentFixture<ManageAppDetailsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAppDetailsInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAppDetailsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
