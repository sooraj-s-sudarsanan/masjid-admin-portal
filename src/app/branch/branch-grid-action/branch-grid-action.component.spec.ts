import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchGridActionComponent } from './branch-grid-action.component';

describe('BranchGridActionComponent', () => {
  let component: BranchGridActionComponent;
  let fixture: ComponentFixture<BranchGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
