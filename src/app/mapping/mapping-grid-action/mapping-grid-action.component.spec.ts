import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingGridActionComponent } from './mapping-grid-action.component';

describe('MappingGridActionComponent', () => {
  let component: MappingGridActionComponent;
  let fixture: ComponentFixture<MappingGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
