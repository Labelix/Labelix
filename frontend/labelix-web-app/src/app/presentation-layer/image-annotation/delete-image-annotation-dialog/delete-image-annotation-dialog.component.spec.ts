import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteImageAnnotationDialogComponent } from './delete-image-annotation-dialog.component';

describe('DeleteImageAnnotationDialogComponent', () => {
  let component: DeleteImageAnnotationDialogComponent;
  let fixture: ComponentFixture<DeleteImageAnnotationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteImageAnnotationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteImageAnnotationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
