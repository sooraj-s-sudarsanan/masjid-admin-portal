import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDataDeleteComponent } from './file-data-delete.component';

describe('FileDataDeleteComponent', () => {
  let component: FileDataDeleteComponent;
  let fixture: ComponentFixture<FileDataDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileDataDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDataDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
