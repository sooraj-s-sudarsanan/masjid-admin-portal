import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationGroupDeleteComponent } from './notification-group-delete.component';

describe('NotificationGroupDeleteComponent', () => {
  let component: NotificationGroupDeleteComponent;
  let fixture: ComponentFixture<NotificationGroupDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationGroupDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationGroupDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
