import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDataFilterComponent } from './file-data-filter.component';

describe('FileDataFilterComponent', () => {
  let component: FileDataFilterComponent;
  let fixture: ComponentFixture<FileDataFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileDataFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDataFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
