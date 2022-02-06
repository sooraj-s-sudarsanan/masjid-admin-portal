import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingDeleteComponent } from './mapping-delete.component';

describe('MappingDeleteComponent', () => {
  let component: MappingDeleteComponent;
  let fixture: ComponentFixture<MappingDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
