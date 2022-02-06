import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubModuleFilterComponent } from './sub-module-filter.component';

describe('SubModuleFilterComponent', () => {
  let component: SubModuleFilterComponent;
  let fixture: ComponentFixture<SubModuleFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubModuleFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubModuleFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
