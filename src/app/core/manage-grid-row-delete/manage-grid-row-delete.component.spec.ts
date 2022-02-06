import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGridRowDeleteComponent } from './manage-grid-row-delete.component';

describe('ManageGridRowDeleteComponent', () => {
  let component: ManageGridRowDeleteComponent;
  let fixture: ComponentFixture<ManageGridRowDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageGridRowDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGridRowDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
