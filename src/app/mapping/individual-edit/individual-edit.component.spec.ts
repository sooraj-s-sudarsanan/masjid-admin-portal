import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualEditComponent } from './individual-edit.component';

describe('IndividualEditComponent', () => {
  let component: IndividualEditComponent;
  let fixture: ComponentFixture<IndividualEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
