import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawedAnnotationListWidgetComponent } from './drawed-annotation-list-widget.component';

describe('WholeImageAnnotationWidgetComponent', () => {
  let component: DrawedAnnotationListWidgetComponent;
  let fixture: ComponentFixture<DrawedAnnotationListWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawedAnnotationListWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawedAnnotationListWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
