import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAnnotationExportFormComponent } from './single-annotation-export-form.component';

describe('SingleAnnotationExportFormComponent', () => {
  let component: SingleAnnotationExportFormComponent;
  let fixture: ComponentFixture<SingleAnnotationExportFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleAnnotationExportFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAnnotationExportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
