import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubModuleGridActionComponent } from './sub-module-grid-action.component';

describe('SubModuleGridActionComponent', () => {
  let component: SubModuleGridActionComponent;
  let fixture: ComponentFixture<SubModuleGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubModuleGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubModuleGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
