import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleGridActionComponent } from './module-grid-action.component';

describe('ModuleGridActionComponent', () => {
  let component: ModuleGridActionComponent;
  let fixture: ComponentFixture<ModuleGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
