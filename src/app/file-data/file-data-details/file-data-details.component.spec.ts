import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileDataDetailsComponent } from './file-data-details.component';

describe('FileDataDetailsComponent', () => {
  let component: FileDataDetailsComponent;
  let fixture: ComponentFixture<FileDataDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileDataDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDataDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
