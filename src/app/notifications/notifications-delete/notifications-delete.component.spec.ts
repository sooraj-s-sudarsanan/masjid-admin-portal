import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsDeleteComponent } from './notifications-delete.component';

describe('NotificationsDeleteComponent', () => {
  let component: NotificationsDeleteComponent;
  let fixture: ComponentFixture<NotificationsDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
