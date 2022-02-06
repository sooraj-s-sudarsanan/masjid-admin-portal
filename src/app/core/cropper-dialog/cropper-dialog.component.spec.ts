import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropperDialogComponent } from './cropper-dialog.component';

describe('CropperDialogComponent', () => {
  let component: CropperDialogComponent;
  let fixture: ComponentFixture<CropperDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropperDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
