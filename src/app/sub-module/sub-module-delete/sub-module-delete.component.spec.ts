import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubModuleDeleteComponent } from './sub-module-delete.component';

describe('SubModuleDeleteComponent', () => {
  let component: SubModuleDeleteComponent;
  let fixture: ComponentFixture<SubModuleDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubModuleDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubModuleDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
