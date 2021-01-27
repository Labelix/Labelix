import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadEditDialogComponent } from './image-upload-edit-dialog.component';

describe('ImageUploadEditDialogComponent', () => {
  let component: ImageUploadEditDialogComponent;
  let fixture: ComponentFixture<ImageUploadEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUploadEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploadEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
