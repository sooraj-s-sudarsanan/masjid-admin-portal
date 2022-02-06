import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDataListComponent } from './file-data-list.component';

describe('FileDataListComponent', () => {
  let component: FileDataListComponent;
  let fixture: ComponentFixture<FileDataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileDataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
