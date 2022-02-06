import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationGroupGridActionComponent } from './notification-group-grid-action.component';

describe('NotificationGroupGridActionComponent', () => {
  let component: NotificationGroupGridActionComponent;
  let fixture: ComponentFixture<NotificationGroupGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationGroupGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationGroupGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
