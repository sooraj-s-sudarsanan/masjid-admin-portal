import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsDetailsComponent } from './notifications-details.component';

describe('NotificationsDetailsComponent', () => {
  let component: NotificationsDetailsComponent;
  let fixture: ComponentFixture<NotificationsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
