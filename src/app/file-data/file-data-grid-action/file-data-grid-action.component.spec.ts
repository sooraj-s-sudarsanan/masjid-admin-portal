import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDataGridActionComponent } from './file-data-grid-action.component';

describe('FileDataGridActionComponent', () => {
  let component: FileDataGridActionComponent;
  let fixture: ComponentFixture<FileDataGridActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileDataGridActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDataGridActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
