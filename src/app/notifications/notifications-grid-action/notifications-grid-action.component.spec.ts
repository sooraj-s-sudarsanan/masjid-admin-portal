import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsGridActionComponent } from './notifications-grid-action.component';

describe('NotificationsGridActionComponent', () => {
  let component: NotificationsGridActionComponent;
  let fixture: ComponentFixture<NotificationsGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
