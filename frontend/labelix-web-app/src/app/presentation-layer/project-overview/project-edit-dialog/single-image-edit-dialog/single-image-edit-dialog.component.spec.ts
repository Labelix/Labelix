import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleImageEditDialogComponent } from './single-image-edit-dialog.component';

describe('SingleImageEditDialogComponent', () => {
  let component: SingleImageEditDialogComponent;
  let fixture: ComponentFixture<SingleImageEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleImageEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleImageEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
