import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationGroupDetailsComponent } from './notification-group-details.component';

describe('NotificationGroupDetailsComponent', () => {
  let component: NotificationGroupDetailsComponent;
  let fixture: ComponentFixture<NotificationGroupDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationGroupDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationGroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
